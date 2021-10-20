import React, {useState } from 'react';
import './App.css';
import getWeb3 from './getWeb3';
import NFT721 from './artifacts/NFT721.json';
const App = () => {
  const [web3,setweb3]=useState();
  const [account,setaccount]=useState();
  const [contract,setcontract]=useState();
  const [networkName,setnetworkName]=useState("Wallet not");
  const [Balance,setBalance]=useState();
  const [Screen,setScreen]=useState();
  const [OwnerAddress,setOwnerAddress]=useState('j');
  const [NewOwnerAddress,setNewOwnerAddress]=useState('j');
  const [OperatorAddress,setOperatorAddress]=useState('j');
  const [Approvedbool,setApprovedbool]=useState(false);
  const [BaseURI,setBaseURI]=useState();
  const [TokenId,setTokenId]=useState();
  const [Toaddress,setToaddress]=useState('j');
  const [Fromaddress,setFromaddress]=useState('j');
  const [Quantity,setQuantity]=useState();
 const connect = async () => {
      const Web3 = await getWeb3();
      setweb3(Web3);
      const accounts = await Web3.eth.getAccounts();
      setaccount(accounts[0]);
      const balance = await Web3.eth.getBalance(accounts[0]);
      // console.log(balance);
      setBalance(balance);
       const networkId = await Web3.eth.net.getId();
       if(networkId===1){
        setnetworkName("Mainnet")
        alert("Connect to Rinkeby network otherwise it won't work")
      }else if(networkId===3){
        setnetworkName("Ropsten")
        alert("Connect to Rinkeby network otherwise it won't work")
      }else if(networkId===42){
        setnetworkName("Kovan")
        alert("Connect to Rinkeby network otherwise it won't work")
      }else if(networkId===4){
        setnetworkName("Rinkeby")
      }else if(networkId===5){
        setnetworkName("Goerli")
        alert("Connect to Rinkeby network otherwise it won't work")
      }else if(networkId===5777){
        setnetworkName("Ganache")
        alert("Connect to Rinkeby network otherwise it won't work")
      }else{
        setnetworkName("Undefined")
        alert("Connect to Rinkeby network otherwise it won't work")
      }
       const deployedNetwork = NFT721.networks[networkId];
       const instance = new Web3.eth.Contract(
         NFT721.abi,
         deployedNetwork && deployedNetwork.address);
         setcontract(instance);
 }
connect();

const name=async()=>{
  if(networkName!=="Rinkeby"){
    alert("Connect to Rinkeby network otherwise it won't work")
  }else{
    
    await contract.methods.name().call((err,result)=>{setScreen(result)});
  }
  
}
const symbol=async ()=>{
  if(networkName!=="Rinkeby"){
    alert("Connect to Rinkeby network otherwise it won't work")
  }else{
    await contract.methods.symbol().call((err,result)=>{setScreen(result)});
  }
}
const owner=async ()=>{
  if(networkName!=="Rinkeby"){
    alert("Connect to Rinkeby network otherwise it won't work")
  }else{
    await contract.methods.owner().call((err,result)=>{setScreen(result)});
  }
}
const baseURI=async ()=>{
  if(networkName!=="Rinkeby"){
    alert("Connect to Rinkeby network otherwise it won't work")
  }else{
    await contract.methods.baseURI().call((err,result)=>{setScreen(result)});
  }
}
const tokenURI=(event)=>{
  setTokenId(event.target.value);
}
const Tokenid=async ()=>{
if(networkName!=="Rinkeby"){
  alert("Connect to Rinkeby network otherwise it won't work")
}else{
  await contract.methods.tokenURI(TokenId).call((err,result)=>{setScreen(result)});
}
}
const getApproved=async ()=>{
  if(networkName!=="Rinkeby"){
    alert("Connect to Rinkeby network otherwise it won't work")
  }else{
    await contract.methods.getApproved(TokenId).call((err,result)=>{setScreen(web3.utils.fromWei(result,'ether'))});
  }
  }
const lasttokenId=async ()=>{
  if(networkName!=="Rinkeby"){
    alert("Connect to Rinkeby network otherwise it won't work")
  }else{
    await contract.methods.lasttokenId().call((err,result)=>{
      setScreen(result)
    });
  }
}
const owneraddress=(event)=>{
    setOwnerAddress(event.target.value);
}
const balance=async ()=>{
  if(networkName!=="Rinkeby"){
    alert("Connect to Rinkeby network otherwise it won't work")
  }else if(OwnerAddress.length!==42){
    alert("Enter the correct Rinkeby account address to see the balance.copy the address from your wallet")
  }else{
    await contract.methods.balanceOf(OwnerAddress).call((err,result)=>{setScreen(result)});

  }

}
const ownerof=async ()=>{
  if(networkName!=="Rinkeby"){
    alert("Connect to Rinkeby network otherwise it won't work")
  }else if(TokenId>99){
    alert("Enter the correct token Id")
  }else{
    await contract.methods.ownerOf(TokenId).call((err,result)=>{setScreen(result)});

  }

}
const toaddress=(event)=>{
  setToaddress(event.target.value);
}
const operatoraddress=(event)=>{
  setOperatorAddress(event.target.value);
}
const isApprovedForAll= async()=>{
  if(networkName!=="Rinkeby"){
    alert("Connect to Rinkeby network otherwise it won't work")
  }else if(OwnerAddress.length!==42){
    alert("Enter the correct Rinkeby account address to see the allowance.copy the address from your wallet")
  }else if(Toaddress.length!==42){
    alert("Enter the correct Rinkeby account address to see the allowance.copy the address from your wallet")
  }else{
    await contract.methods.isApprovedForAll(OwnerAddress,Toaddress).call((err,result)=>{setScreen(result)});

  }
}
const Approve= async()=>{
  if(networkName!=="Rinkeby"){
    alert("Connect to Rinkeby network otherwise it won't work")
  }else if(Toaddress.length!==42){
    alert("Enter the correct Rinkeby account address to see the allowance.copy the address from your wallet")
  }else if(TokenId>99){
    alert("Enter the correct Token id.")
  }else{
    await contract.methods.approve(Toaddress,TokenId).send({from:account});

  }
}
const quantity=(event)=>{
  setQuantity(event.target.value);
}
const mintTokens= async()=>{
  if(Quantity<1){
    alert(` Negative amoun of tokekns can not be minted`)
  }else if(networkName!=="Rinkeby"){
    alert("Connect to Rinkeby network otherwise it won't work")
  }else if(Quantity>=100){
    alert("Only 99 tokens can be minted");
  }else{
    await contract.methods.Mint(Quantity).send({from:account});
  }
}
const burn= async()=>{
  if(networkName!=="Rinkeby"){
    alert("Connect to Rinkeby network otherwise it won't work")
  }else if(TokenId>99){
    alert("Enter the correct Token id.")
  }else{
    await contract.methods.Burn(TokenId).send({from:account});

  }
}
const fromaddress=(event)=>{
  setFromaddress(event.target.value);
}
const safetransferfrom= async()=>{
  if(networkName!=="Rinkeby"){
    alert("Connect to Rinkeby network otherwise it won't work")
  }else if(Toaddress.length!==42){
    alert("Enter the correct to address to see the allowance.")
  }else if(TokenId>99){
    alert("Enter the correct Token id.")
  }else if(Fromaddress.length!==42){
    alert("Enter the correct From address to see the allowance.")
  }else{
    await contract.methods.safeTransferFrom(Fromaddress,Toaddress,TokenId,).send({from:account});

  }
}
const approvedbool=(event)=>{
  setApprovedbool(event.target.value)
}
const setapprovalforall= async()=>{
  if(networkName!=="Rinkeby"){
    alert("Connect to Rinkeby network otherwise it won't work")
  }else if(OperatorAddress.length!==42){
    alert("Enter the correct to address to see the allowance.")
  }else{
    await contract.methods.setApprovalForAll(OperatorAddress,Approvedbool).send({from:account});
  }
}
const setbaseuri=(event)=>{
  setBaseURI(event.target.value);
}
const newbaseURI= async()=>{
  if(networkName!=="Rinkeby"){
    alert("Connect to Rinkeby network otherwise it won't work")
  }else{
    await contract.methods.setbaseURI(BaseURI).send({from:account});
  }
}
const setnewowneraddress=(event)=>{
  setNewOwnerAddress(event.target.value);
}
const newbaseuri= async()=>{
  if(networkName!=="Rinkeby"){
    alert("Connect to Rinkeby network otherwise it won't work")
  }else if(NewOwnerAddress.length!==42){
    // alert(NewOwnerAddress.length)
    alert(`Address length is ${NewOwnerAddress.length}.It should be 42 character.Enter the correct address to change the Ownership.`)
  }else{
    await contract.methods.transferOwnership(NewOwnerAddress).send({from:account});
  }
}
const restart=()=>{
 window.location.reload(false);
}
  return (
    <>
  <div className="page">  
  <nav className="navbar">
  <div className="upper">
      <h4>{networkName} Connected</h4>
      <h4>Balance: {Balance} wei</h4>
      <button className="btn" onClick={restart}><h4>Connect to Wallet</h4></button></div>
  <div className="lower">Account:{account}</div>
  </nav>
  <div className="Main">
  <div className="section">
  <div className="screen">{Screen}</div>
      <button className="btn2" onClick={()=>name()}>NFT721 Name</button>
      <button className="btn2" onClick={()=>symbol()}>NFT721 Symbol</button>
      <button className="btn2" onClick={()=>owner()}>NFT721 Owner</button>
      <button className="btn2" onClick={()=>lasttokenId()}>Last token id</button>
      <button className="btn2" onClick={()=>baseURI()}>Base URI</button>
      <input className="input" placeholder="Token Id" type="string" onChange={tokenURI}></input>
      <button className="btn2" onClick={()=>Tokenid()}>Token URI</button>
      <input className="input" placeholder="Token Id" type="string" onChange={tokenURI}></input>
      <button className="btn2" onClick={()=>getApproved()}>Get approved</button>
  <input className="input" placeholder="Account address" type="string" onChange={owneraddress}></input>
      <button className="btn2" onClick={()=>balance()}>Balance of</button>
  <input className="input" placeholder="Token id" type="number" onChange={tokenURI}></input>
      <button className="btn2" onClick={()=>ownerof()}>Owner of</button>
  <input className="input" placeholder="Owner address" type="string" onChange={owneraddress}></input>
  <input className="input" placeholder="Operater address" type="string" onChange={toaddress}></input>
      <button className="btn2" onClick={()=>isApprovedForAll()}>Is approved for all</button>
      <h1>Writing data</h1>
  <input className="input" placeholder="Operator address" type="string" onChange={toaddress}></input>
  <input className="input" placeholder="Token id" type="number" onChange={tokenURI}></input>
      <button className="btn2" onClick={()=>Approve()}>Approve Token</button>
  <input className="input" placeholder="Quantity of tokens" type="number" onChange={quantity}></input>
      <button className="btn2" onClick={()=>mintTokens()}>Mint new tokens</button>
  <input className="input" placeholder="Token id" type="number" onChange={tokenURI}></input>
      <button className="btn2" onClick={()=>burn()}>Burn my own tokens </button>
  <input className="input" placeholder="From address" type="string" onChange={fromaddress}></input>
  <input className="input" placeholder="To address" type="string" onChange={toaddress}></input>
  <input className="input" placeholder="Token id" type="number" onChange={tokenURI}></input>
  <button className="btn2" onClick={()=>safetransferfrom()}>Safe transfer token from</button>
  <input className="input" placeholder="Operator address" type="string" onChange={operatoraddress}></input>
  <input className="input" placeholder="Approved true or false" type="bool" onChange={approvedbool}></input>
  <button className="btn2" onClick={()=>setapprovalforall()}>Set approval for all</button>
  <input className="input" placeholder="Set new base URI" type="string" onChange={setbaseuri}></input>
  <button className="btn2" onClick={()=>newbaseURI()}>Set base URI</button>
  <input className="input" placeholder="new Owner address" type="string" onChange={setnewowneraddress}></input>
  <button className="btn2" onClick={()=>newbaseuri()}>Change Ownership</button>
  </div>
      
  </div>
  </div>
    </>
  )
}
export default App;
