### http相关的面试题
#### 1. 请求头和响应头的字段特点：
   + 字段名不区分大小写
   + 字段名不允许出现空格，不可以出现下划线
   + 字段名后面必须紧跟着：

#### 2. get请求和post请求的区别
   + 从缓存的角度，get请求会被浏览器主动缓存下来，留下历史记录，而post请求默认不会。
   + 从编码的角度，get只能进行url编码，只能接收ascii字符，而post没有限制。
   + 从参数的角度，get一般放在url中，不安全，post请求放在请求体中，更适合传输敏感信息。
   + 从幂等的角度，get请求是幂等的，而post不是。（幂等表示执行相同的操作，结果也是相同的）
   + 从tcp的角度，get请求会把请求报文一次性发出去，而post会分成两个tcp数据包，首次先发送header，如果服务器响应100，然后发送body部分。
#### 3. http的状态码
   + 200成功状态码，响应体中放有数据。
   + 204 No Content成功状态码，但是响应头没有body数据。
   + 206 partial content 使用场景为http分块下载和断点续传。
   + 301永久重定向，如果以前的站点再也不用了，应当返回301,这个时候浏览器默认会做缓存优化，在第二次访问的时候自动访问重定向的那个网址。
   + 302临时重定向，浏览器并不会做缓存优化。
   + 304 当协商缓存命中的时候会返回这个状态码。
#### 4. http的特点：
   + 灵活可扩展，一个是语义上的自由，只规定了基本格式，其他部分都没有严格的语法限制。另外一个是传输的多样性，不仅仅可以传输文本，还能传输图片视频等任意数据，非常方便。
   + 传输可靠
   + 无状态
      + 状态的含义是指客户端和服务器在会话中产生的数据，无状态就是指这些数据不会被保留。
   + 缺点：
      1. 无状态，在需要长连接的场景中，需要保存大量的上下文信息，以免传输大量重复的信息，那么这时候无状态就是http的缺点。但是与此同时，另外一些应用只是为了获取一些数据，不需要报讯连接上下文信息，无状态反而减少了网络开销，成为了http的优点。
      2. 明文传输：给攻击者提供了便利
      3. 队头阻塞：当http开启长链接的时候，公用一个tcp连接，同一时刻只能处理一个请求，那么放请求耗时过长，其他请求只能处于阻塞状态，也就是著名的队头阻塞问题。
#### 5. 代理缓存<br/>
   如果每次客户端缓存失效都要到源服务器获取，给源服务器的压力是很大的。
   在源服务器的响应头中，会加上cache-control这个字段进行缓存控制字段，那么它的值当中可以加入private或者public表示是否允许代理服务器缓存，前者禁止，后者允许。
   + must-revalidate的意思是客户端缓存过期了就去源服务器获取，而proxy-revalidate则表示代理服务器的缓存过期之后到源服务器获取。
   + s-maxage  限定缓存在代理服务器可以存放多久。
   + max-stale min-fresh
   + only-if-cached只接受代理缓存，不会接受服务器端的响应，如果代理缓存无效，就直接返回504.
#### 6. 同源策略：
   非同源站点有这样一些限制：
      + 不能读取和修改对方的dom
      + 不能访问对方的cookie indexDb localStorage
      + 限制xmlhttprequest请求
    + 跨域请求的响应一般会被浏览器拦截，注意，是被浏览器拦截，响应其实是成功到达了客户端。
    在服务端返回完数据后，将响应返回，主进程检查到跨域，且没有cors响应头，将响应体全部丢掉，并不会发送给渲染进程，这就达到了拦截数据的目的。
#### 7. http2.0做了哪些改进
   + 头部压缩
   + 多路复用
      + 解决对头阻塞的问题，
   + 服务端推送
#### Http的前世今生
+ http0.9
   + 当时的需求很简单，就是用来传输体积很小的 HTML 文件
   1. 单行协议，以唯一的get方法开头，后面紧跟的是目标资源的目录。
   2. 没有响应头，没有状态码，只传输html文件
   3. 第三个是返回的文件内容是以 ASCII 字符流来传输的
+ http1.0
   + 浏览器这中展示的不单是html文件了，还有js,css 图片 音频 视频等文件
   1. 协议版本信息会随请求发送
   2. 相应状态码
   3. 引入http头的概念，使协议变得灵活，更加具有扩展性
   4. content-type请求头，具备了传输除纯文本html文件以外的其他类型文档的能力。
   5. 同时还约定了请求和响应数据的压缩方式，支持语言，字符集等，
+ http1.1
   1. 连接可以复用 支持长连接 http1.1默认开启connection:keep-alive
      + 短连接的缺点严重制约了服务器的服务能力，导致他无法处理更多的请求。
   2. 增加了管道化技术，以降低通信延迟。复用同一个tcp连接起键，即便是通过管道同时发送了多个请求，服务端也是按请求的顺序依次给出响应的。而客户端在未收到之前所发出的响应之前，将会阻塞后面请求，这称为“队头阻塞”
      + 队头阻塞问题可以用并发连接和域名分片技术缓解
   3. 支持响应分块，分块编码传输：Transfer-encoding: chunked
      + 只要请求或响应的头信息有Transfer-Encoding:chunked字段，就表明body将可能由数量未定的多个数据块组成。
      + Host头，不同的域名配置同一个ip地址的服务器，host是http1.1协议中新增的一个请求头，主要用来实现虚拟主机技术。虚拟主机可以利用虚拟技术把一台服务器分成若干个主机，因此可以在单一主机上运行多个网站或服务。
   4. cookie
   + 存在的问题
      + 带宽的利用率不理想
         1. tcp的慢启动
      + 对头阻塞 虽然能公用一个TCP管道，但是一个管道中同一时刻只能处理一个请求。
+ http2.0
   1. http2是二进制协议而不是文本协议
      + 帧是流中的数据单位。客户端与服务器通过交换帧来通信，帧是基于这个新协议通信的最小单位
      + http2.0中的帧将http1.x消息分成帧并嵌入到流中，数据帧和报头帧分离，这将允许报头压缩。
      + 数据帧和报头帧分离，这将允许报头压缩，将多个流组合，这是一个被称为多路复用的过程，它允许更有效的底层tcp连接。
      + 压缩headers，http中的header带有大量信息，而且每次都要重复发送，就造成了性能的损耗。为了减少此开销和提升性能。
      + 服务端推送。减少了请求的延迟时间。
#### 三次握手：
   + tcp的三次握手，是需要确认双方有两样能力：发送能力和接收能力。
   + 过程：
      1. 双方都处于closed状态，然后服务端开始监听某个端口，进入listen状态
      2. 客户端主动发起连接，发送syn，自己变成syn-sent状态
      3. 服务端接收到，返回syn和ack，自己变成syn-revd
      4. 之后客户端再发送ack给服务器，自己变成established状态，服务端收到ack之后，也变成established状态。
   + 需要注意的是，syn是需要消耗一个序列号，下次发送对应的ack序列号都要加1， syn是需要对端确认，而ack并不需要
#### 四次挥手
   + 过程
      1. 刚开始双方处于established状态
      2. 客户端要断开了，向服务端发送fin报文，客户端变成fin-wait-1状态，客户端变成半关闭状态，无法发送只能接收
      3. 服务端接收后向客户端确认，变成closed-wait状态
      4. 客户端收到服务端确认，自己变成fin-wait2状态，随后服务端向客户端发送fin，自己进入last-ack状态
      5. 客户端收到服务端发来的fin后，自己变成time-wait状态，然后发送ack给服务端。这个时候客户端需要等待足够长的时间，具体来说，是2个msl(报文最大生存时间)，在这段时间内如果客户端没有收到服务端的重新请求，那么表示ack成功到达，挥手结束。
#### https
   + http是明文传输，传输的每一个环节，都有可能会被第三方窃取
   + https并不是一个新协议，而是加强版的http。其原理是在http和tcp之间建立一个中间层。经过中间层进行加密，将加密后的数据包传给tcp，这个层叫做安全层。
   + 对称加密和非对称加密
      1. 对称加密是加密和解密用的是同样的密钥
      2. 非对称加密是有两把密钥
   + 对称加密可能不安全，非对称加密计算量大，处理器耗时，
   + 浏览器采用对称加密和非对称加密的过程
      1. 浏览器向服务器发送client_random和加密方法列表
      2. 服务器收到，返回server_random，加密方法和公钥
      3. 浏览器接收，生成另外一个随机数per_ranom，并且用公钥加密，传输给服务端
      4. 服务器用公钥解密这个被加密的pre_random
      5. 浏览器和服务器有三样相同的凭证 clinent_random server_random和pre_random 然后两则和用下个团的加密方法混合这三个随机数，生成最终的密钥。
      5. 然后浏览器和服务器就使用一样的密钥进行通信 对称加密
   + 当服务端传输server_random的时候，会顺带加上数字证书，客户端对数字证书进行验证，验证通过，后面的过程照常进行。
![jiami](../media/httpencry.jpg)
###### 大文件的处理
1. 数据压缩
   + 对文本文件有较好的压缩率，图片，音频的话已经是高度压缩，再用Gzip处理也不会变小
2. 分块传输
   + 在响应保温里用头子段transfer-encoding chunked来表示，意思是报文里body不是一次性发过来的
3. 范围请求
   + 我们想获取一个大文件其中的片段数据，而分块传输没有这个能力，http提出了范围请求的概念，允许客户端在请求里使用专用字段来表示只获取文件的一部分
   + accept-ranges:byte来告诉客户端我是支持范围请求的
   + 请求头range是http范围请求的专用字段，格式是bytes=x-y
   + 服务器收到range字段后
      1. 检查范围的合法性
      2. 合法的话，根据range头计算偏移量，返回206
      3. 服务器要添加一个content-range来告诉片段的实际偏移量和资源的总大小
      4. 发送数据
###### 代理服务器
+ 他是在客户端和服务器原本的通信链路中插入的一个中间环节
+ 作用
   1. 负载均衡，代理服务器掌握了请求分发的大权，决定由后面的哪台服务器来响应请求
   2. 健康检查
   3. 安全防护
   4. 加密卸载
   5. 数据过滤
   6. 内容缓存
+ 代理服务器需要用字段“Via”标明代理的身份。
+ 每当报文经过一个代理节点，代理服务器就会把自身的信息追加到字段的末尾，就像是经手人盖了一个章
+ X-Forwarded-For”的字面意思是“为谁而转发”，追加的是请求方的 IP 地址。
+ “X-Real-IP”是另一种获取客户端真实 IP 的手段，它的作用很简单，就是记录客户端 IP 地址，没有中间的代理信息
###### 摘要算法
+ 他能够把任意长度的数据压缩成固定长度，而且独一无二的摘要字符串，就好像是给这段数据生成一个数字指纹
+ 单向的加密算法，只有算法 没有秘钥 加密后的数据没法解密 MD5 SHA-1他们就是最常用的两个摘要算法，能够生成16字节