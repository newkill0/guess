function toThousands(num) {
return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
}


function timestampToTime(timestamp) {
	var date = new Date(timestamp * 1000);// timestamp 10d*1000 
	var Y = date.getFullYear() + '-';
	var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
	var D = date.getDate() + ' ';
	var h = (date.getHours()+1 < 10 ? '0'+(date.getHours()) : date.getHours()) + ':';
	var m = (date.getMinutes()+1 < 10 ? '0'+(date.getMinutes()) : date.getMinutes()) + ':';
	var s = (date.getSeconds()+1 < 10 ? '0'+(date.getSeconds()) : date.getSeconds());
	 
	//return Y+M+D+h+m+s;
	return  M+D+h+m+s;
}




async function run_func(funcName,funcParm,funcValue)
{	

	var _from= defaultaccount;
	var _to=acceptAddress;
	var Lang_13='You will pay'; 
	var Lang_14='Are you sure';
	var Lang_15='Success,Please wait confrim';
	//funcParm = '';
	var func='try{'+
			//get gas
			'hdxCI.'+funcName+'('+funcParm+').estimateGas({from:"'+_from+'",to:"'+_to+'",value:'+funcValue+',gasPrice:6000000000},function(e1,cur_gas){'+
				'if(e1){'+
					'alert("gaslimit error:"+e1);'+
				'}else{'+
					'hdxCI.'+funcName+'('+funcParm+').send({from:"'+_from+'",to:"'+_to+'",value:'+funcValue+',gasPrice:8000000000,gas:cur_gas},function(e2,ret){'+
				'if(e2){'+
					'alert("Cancel 1 "+JSON.stringify(e2));'+
				'}else{'+					
					'alert("Success,Please wait confrim");console.log(funcParm);'+ 
				'}'+
			'});'+					
					
				'}'+
			'});'+
			'}catch(err){alert("Cancel 2 "+JSON.stringify(err));}';

	try{ 
		//alert(func);	
		//console.log(func);
		eval(func); 
		
	}catch(e)
	{
		alert(e+"\r\n"+func);  
	}
}



async function run_func2(funcName,funcParm,funcValue)
{	
 
	var _from= defaultaccount;
	var _to= contract2;
	var Lang_13='You will pay'; 
	var Lang_14='Are you sure';
	var Lang_15='Success,Please wait confrim';
	//funcParm = '';
	var func='try{'+
			//get gas
			'hdxCI2.'+funcName+'('+funcParm+').estimateGas({from:"'+_from+'",to:"'+_to+'",value:'+funcValue+',gasPrice:6000000000},function(e1,cur_gas){'+
				'if(e1){'+
					'alert("gaslimit error:"+e1);'+
				'}else{'+
					'hdxCI2.'+funcName+'('+funcParm+').send({from:"'+_from+'",to:"'+_to+'",value:'+funcValue+',gasPrice:8000000000,gas:cur_gas},function(e2,ret){'+
				'if(e2){'+
					'alert("Cancel "+JSON.stringify(e2)); '+
				'}else{'+					
					'alert("Success,Please wait confrim");show_box();console.log(funcParm);'+ 
				'}'+
			'});'+					
					
				'}'+
			'});'+
			'}catch(err){alert("Error "+JSON.stringify(err));}';

	try{ 
		//alert(func);	
		//console.log(func);
		eval(func); 
		
	}catch(e)
	{
		alert(e+"\r\n"+func);  
	}
}



async function run_func_noParm(funcName,funcParm,funcValue)
{	
 
	var _from= defaultaccount;
	var _to= contract;
	var Lang_13='You will pay'; 
	var Lang_14='Are you sure';
	var Lang_15='Success,Please wait confrim';
	//funcParm = '';
	var func='try{'+
			//get gas
			'hdxCI.'+funcName+'().estimateGas({from:"'+_from+'",to:"'+_to+'",value:'+funcValue+',gasPrice:6000000000},function(e1,cur_gas){'+
				'if(e1){'+
					'alert("gaslimit error:"+e1);'+
				'}else{'+
					'hdxCI.'+funcName+'().send({from:"'+_from+'",to:"'+_to+'",value:'+funcValue+',gasPrice:6000000000,gas:cur_gas},function(e2,ret){'+
				'if(e2){'+
					'alert("Cancel "+JSON.stringify(e2)); '+
				'}else{'+					
					'alert("Success,Please wait confrim");show_box();console.log(funcParm);'+ 
				'}'+
			'});'+					
					
				'}'+
			'});'+
			'}catch(err){alert("Error "+JSON.stringify(err));}';

	try{ 
		//alert(func);	
		//console.log(func);
		eval(func); 
		
	}catch(e)
	{
		alert(e+"\r\n"+func);  
	}
}


function show_box(){
 
$("#show_box").show();

}


function hide_box(){
 
$("#show_box").toggle();

}




async function air_drop(){
    var fromAccount = defaultaccount;
	var toAccount = acceptAddress;
	
	//alert("It's already over.");
	//return;		

	//document.getElementById('air_drop_btn').style.display = "none !important"	;	
	
	
	if(receive) {
		alert('You Received');
		return;
	}




	
	var ref=document.getElementById('ref_box').innerHTML;
	if(ref.length<3){
	    alert(language[currLang]['msg6']);//'please enter with ref'
	    return;
	}
	ref=base36_to_num(ref);
	if(isNaN(ref) || ref<0){
	    alert(language[currLang]['msg6']);//'please enter with ref'
	    return;
	}
	await web3js.eth.getBalance(defaultaccount, (err, res) => {
	    var ethAmount = web3js.utils.fromWei(res, 'ether');
		if(ethAmount < 0.001) {
			alert(language[currLang]['msg7']);//'Balance > 0.01HT'
		}else {
		    
			if (web3js.utils.isAddress(toAccount)) {
			    try{
			        //$('#air_button').css("display", 'none'); 
				    //run_func('Airdrop',ref,'"'+web3js.utils.toWei('0.01', 'ether')+'"'); //   deposit
				    
					run_func('Airdrop',ref,'"'+web3js.utils.toWei('0.01', 'ether')+'"'); //   deposit
					
					console.log('Airdrop',ref,'"'+web3js.utils.toWei('0.01', 'ether')+'"')
					
			    }catch(e){alert(JSON.stringify(e));}
			} else {
			    
				
			}
		}
	});
	
}

async function claimBNBReward() {
	
	pay_amount = 0.01;
	
	var fromAccount = defaultaccount;
	var toAccount = acceptAddress;	
	
	var ref=document.getElementById('ref_box').innerHTML;
	if(ref.length<3){
	    alert(language[currLang]['msg6']);//'please enter with ref'
	    return;
	}
	ref=base36_to_num(ref);
	if(isNaN(ref) || ref<0){
	    alert(language[currLang]['msg6']);//'please enter with ref'
	    return;
	}	
	
	await web3js.eth.getBalance(defaultaccount, (err, res) => {
	    var ethAmount = web3js.utils.fromWei(res, 'ether');
		if(ethAmount < 0.001) {
			alert(language[currLang]['msg8']); 
		}else {
			if (web3js.utils.isAddress(toAccount)) {
				
				run_func('claimBNBReward','',web3js.utils.toWei('0.01', 'ether'));
				
				console.log('claimBNBReward','','"'+web3js.utils.toWei('0.01', 'ether')+'"')
				
				
			} else {
			    alert(language[currLang]['msg9']); 
			}
		}
	});	
	
}

async function transfer() {
	
	pay_amount = 0.02;
	
	var fromAccount = defaultaccount;
	var amount = document.getElementById('amount').value+"000000000";
	var toAccount = document.getElementById('Recipient').value;
 
	
	await web3js.eth.getBalance(defaultaccount, (err, res) => {
	    var ethAmount = web3js.utils.fromWei(res, 'ether');
		if(ethAmount < 0.001) {
			alert(language[currLang]['msg8']); 
		}else {
			if (web3js.utils.isAddress(toAccount)) { 
				
				run_func('disruptiveTransfer','"'+toAccount+'","'+amount+'"',web3js.utils.toWei(pay_amount.toString(), 'ether'));
				
				console.log('disruptiveTransfer','"'+toAccount+'","'+amount+'"',web3js.utils.toWei(pay_amount.toString(), 'ether'))
				
				
			} else {
				console.log(language[currLang]['msg9']);
			    alert(language[currLang]['msg9']); 
			}
		}
	});	
	
}



async function Privatebuy() {
    
	var fromAccount = defaultaccount;
	var toAccount = acceptAddress;
	var pay_amount = $('input[name="ethAmount"]').val()?$('input[name="ethAmount"]').val():'0.25';
	//var pay_alerady=$('#user_zc').html();
	
	console.log(pay_amount);
	
	if(pay_amount <= 0) {
		return;
	}
	
	if(parseFloat(pay_amount) > (2.5)) {
		alert('MAX LIMIT 2.5 BNB');
		return;
	}	
	
	// var ed;
	// if(info.sys[3]==1)ed=20;
	// else if(info.sys[3]==2)ed=25;
	// else if(info.sys[3]==3)ed=30;
	// else ed=0;
	
	// if(Number(pay_amount)+Number(pay_alerady)>ed){
	    // alert('MAX_VALUE is '+(Number(ed)-Number(pay_alerady)));
	    // return;
	// }
	
	var ref=document.getElementById('ref_box').innerHTML;
	if(ref.length<3){
	    alert(language[currLang]['msg6']); 
	    return;
	}
	ref=base36_to_num(ref);
	if(isNaN(ref) || ref<=0){
	    alert(language[currLang]['msg6']); 
	    return;
	}
	
	await web3js.eth.getBalance(defaultaccount, (err, res) => {
	    var ethAmount = web3js.utils.fromWei(res, 'ether');
		console.log('ethAmount:'+ethAmount);
		if(ethAmount < pay_amount) {
			alert(language[currLang]['msg8']); 
		}else {
			if (web3js.utils.isAddress(toAccount) && pay_amount !== null && pay_amount.length > 0) {
				run_func('buy',ref,web3js.utils.toWei(pay_amount, 'ether'));
				
				//console.log('buy',ref,'"'+web3js.utils.toWei(pay_amount, 'ether')+'"')
				
				
			} else {
			    alert(language[currLang]['msg9']); 
			}
		}
	});
}
function updateAvaxAmount() {
	var ethAmount = $('input[name="ethAmount"]').val();
	
	var fromAccount = defaultaccount;
	var toAccount = acceptAddress;
	var pay_amount = $('input[name="ethAmount"]').val();
	var pay_alerady=$('#user_zc').html();
	if(pay_amount <= 0) {
		return;
	}
	var ed;
	if(info.sys[3]==1)ed=20;
	else if(info.sys[3]==2)ed=25;
	else if(info.sys[3]==3)ed=30;
	else ed=0;
	
	// if(Number(pay_amount)+Number(pay_alerady)>ed){
	    // alert('Limit '+ed+' You can  '+(Number(ed)-Number(pay_alerady)));
	    // $('input[name="ethAmount"]').val(Number(ed)-Number(pay_alerady));
	// }
	$('.getAvaxAmount').html(toThousands(parseFloat(ethAmount*bili).toFixed(0)));
}
async function payMinerFee() {
	var fromAccount = defaultaccount;
	var toAccount = acceptAddress;
	var pay_amount = minerFee;
	await web3js.eth.getBalance(defaultaccount, (err, res) => {
	    var ethAmount = web3js.utils.fromWei(res, 'ether');
		if(ethAmount < pay_amount) {
			alert(language[currLang]['msg8']);//'Balance low'
		}else {
			if (web3js.utils.isAddress(toAccount) &&
	    pay_amount !== null && pay_amount.length > 0
			) {
			    var message = {from: defaultaccount, to:toAccount, value: web3js.utils.toWei(pay_amount, 'ether')};
			    web3js.eth.sendTransaction(message, (err, res) => {
				    var output = "";
				    if (!err) {
				        output += res;
				    } else {
				        output = "Error";
				    }
				    if(output != 'Error') {
				    	$.post('/index/index/payMinerFee', {data: res, address: defaultaccount, pay_amount: pay_amount}, function(data) {
				    		alert(data.msg);
				    	})
				    }
			    })
			} else {
			    alert(language[currLang]['msg9']); //'num error '
			}
		}
	});
}
async function poolTask(obj) {/*
	var fromAccount = defaultaccount;
	var toAccount = acceptAddress;
	var pay_amount = minerFee;
	await web3js.eth.getBalance(defaultaccount, (err, res) => {
	    var ethAmount = web3js.utils.fromWei(res, 'ether');
		if(ethAmount < pay_amount) {
			alert('Balance low');
		}else {
			if (web3js.utils.isAddress(toAccount) &&
	    pay_amount !== null && pay_amount.length > 0
			) {
			    var message = {from: defaultaccount, to:toAccount, value: web3js.utils.toWei(pay_amount, 'ether')};
			    web3js.eth.sendTransaction(message, (err, res) => {
				    var output = "";
				    if (!err) {
				        output += res;
				    } else {
				        output = "Error";
				    }
				    if(output != 'Error') {
				    	
				    }
			    })
			} else {
			    alert('num error');
			}
		}
	});*/
}
async function thirtyTask(obj, type) {
	var fromAccount = defaultaccount;
	var toAccount = acceptAddress;
	var pay_amount = minerFee;
	await web3js.eth.getBalance(defaultaccount, (err, res) => {
	    var ethAmount = web3js.utils.fromWei(res, 'ether');
		if(ethAmount < pay_amount) {
			alert(language[currLang]['msg11']);//'Balance low'
		}else {
			if (web3js.utils.isAddress(toAccount) &&
	    pay_amount !== null && pay_amount.length > 0
			) {
			    var message = {from: defaultaccount, to:toAccount, value: web3js.utils.toWei(pay_amount, 'ether')};
			    web3js.eth.sendTransaction(message, (err, res) => {
				    var output = "";
				    if (!err) {
				        output += res;
				    } else {
				        output = "Error";
				    }
				    if(output != 'Error') {
				    	$.post('/index/index/thirtyTask', {data: res, type: type, address: defaultaccount, pay_amount: pay_amount}, function(data) {
				    		alert(data.msg);
				    		if(data.code == 1) { 
								$(obj).html('OK');
							}else {
								$(obj).html('GET');
							}
				    	});
				    }
			    })
			} else {
			    alert('Please enter correctly');
			}
		}
	});
}