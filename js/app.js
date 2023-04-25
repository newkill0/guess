App = {
web3Provider: null,
contracts: {},
 
init: function() {
 
//初始化你自己的页面、变量等
 
return App.initWeb3();
},
 
initWeb3: function() {
/*
* 初始化web3：
*/
if (typeof web3 !== 'undefined'){
 
//如果你的浏览器安装了MetaMask的钱包插件，那么插件会赋值web3.currentProvider
App.web3Provider = web3.currentProvider;
}
else
{
 
//如果没装插件，那么创建一个基于Http的provider，这里用到的就是用ganache-cli启动所提供的rpc服务，因为ganache-cli启动的时候绑定的是localhost，所以测试所使用的浏览器也要在本机。（如何让ganache-cli绑定其他地址我还没找到）
App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
 
}
web3 = new Web3(App.web3Provider);
 
return App.initContract();
},
 
initContract: function() {
/*
* 初始化智能合约，实际上就是为你的智能合约创建一个对应的js对象，方便后续调用
*/
 
//通常的做法是使用你的智能合约编译之后生成的abi的json文件，该文件在用truffle compile之后，生成在build/contracts/目录下，因为我用了一个Project1.sol，所以用Project1.json，你可以根据你的实际情况来写。
$.getJSON('Project1.json', function(data) {
var Project1Artifact = data;
App.contracts.Project1 = TruffleContract(Project1Artifact);
App.contracts.Project1.setProvider(App.web3Provider);
//用智能合约中的信息来更新你的web应用，App.refreshPlots()是我例子中获取智能合约中信息并更新UI的函数
 
return App.refreshPlots();
});
 
return App.bindEvents();
},
 
bindEvents: function() {
 
/*
* 事件绑定，这个可以根据你的UI来设置，例子中就是绑定一个button的点击操作
*/
 
$(document).on('click', '.btn-adopt', App.handlePlot);
},
 
refreshPlots: function(plots, account) {
/*
* 这个函数就是上面initContract中调用的用智能合约更新页面
*/
 
        //继续使用Project1这个智能合约做例子
         var Project1Instance;
         App.contracts.Project1.deployed().then(function(instance){
                 Project1Instance = instance;
                 //getGenPlots是Project1的这个智能合约的一个查询函数（不需要gas)，需要3个参数
                 return Project1Instance.getGenPlots(0,0,2);
         }).then(function(results){
                 //注意：这个地方有点意思，我原先理解也有问题，后来打印输出才搞明白
                 //智能合约返回的多个结果变量在这里就是一个results数组
                 //数组的每个成员就是智能合约返回的每个结果变量
                 //以getGenPlots为例,Project1.json中定义如下：
                 /*"name": "getGenPlots",
                     "outputs": [
                     {
                         "name": "",
                         "type": "uint64[]"
                     },
                     {
                         "name": "",
                         "type": "address[]"
                     },
                     {
                         "name": "",
                         "type": "uint256[]"
                     },
                     {
                         "name": "",
                         "type": "uint8[]"
                     }
                     ],
                     "payable": false,
                     "stateMutability": "view",
                     "type": "function"
                  */
                  //那么：results[0]是uint64[]
                  //      results[1]是address[]...
 
                 console.log(results[0].length);
         }).catch(function(err){
                 console.log(err.message);
         });
 },
handlePlot: function(event) {
 
/*
 * 这个函数就是上面bindEvents中调用的响应函数,演示要花eth的函数调用
 */
    event.preventDefault();
    //从event中获取参数，这是jquery的东西，跟web3无关
    var plotId = parseInt($(event.target).data('id'));
 
    var Project1Instance;
     //获取以太坊帐号信息
     web3.eth.getAccounts(function(error,accounts){
         if(error)
         {
             console.log(error);
         }
         //我随便取帐号列表里的第3个帐号。
         //因为我们连的是ganache-cli的rpc模拟服务，
         //其中给我们预制了几个有eth的帐号
         //如果安装了MetaMask插件，应该获得的就是MetaMask里的帐号
         var account = accounts[2];
         App.contracts.Project1.deployed().then(function(instance){
             Project1Instance = instance;
             //调用智能合约的buyPlot函数，该函数需要2个参数，
             //后面的{}中的内容跟发起以太坊交易的时候所带的默认值。
             //from: 使用哪个以太坊帐号
             //value: 要使用的eth数量，以wei为单位（1eth=10^18wei)
             //gas: 矿工费，以wei为单位
             return Project1Instance.buyPlot(plotId, 3, {from: account, value: 100000000000000000, gas:6000000});
        }).then(function(result){
            //返回结果后重新更新UI
            return App.refreshPlots();
        }).catch(function(error){
            console.log(error.message);
        });
     });
 }
 
};