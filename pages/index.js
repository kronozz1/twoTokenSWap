import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import React from 'react';
import { Swapabi , SwapAddress} from '../contants';
import Web3Modal from 'web3modal';
import {providers , Contract , BigNumber , utils} from 'ethers';
export default function Home() {
    const zero = BigNumber.from(0);
  const [walletConnected , setwalletConnected] = React.useState(false)
  const [balanceOfAmanDevTokens ,setbalanceOfAmanDevTokens] = React.useState(zero);
      const [TokenMinted , setTokenMinted] = React.useState(zero);
  const [loading , setloading] = React.useState(false);
  const [ input , setinput] = React.useState();
  const [input2 , setinput2] = React.useState();
  const ModelRef= React.useRef();
  const getSignerOrProvider = async(needSigner = false) =>{
    const provider = await ModelRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);
    const {chainId} = await web3Provider.getNetwork();
    if(chainId != 97){
      window.alert("Change Your Network to BNB Network");
      throw new Error("Change Your Network to BNB Network");
    }
    if(needSigner ){
      const signer = await web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  }
  const handleChange= async (e) =>{
 setinput(e.target.value);
  }
  console.log(input);

  const getBlanceTokenAmanDevToken = async() =>{
    try{
    const provider = await getSignerOrProvider();
    const myContract = new Contract(SwapAddress , Swapabi , provider);
      const signer = await getSignerOrProvider(true);
      const address = await signer.getAddress();

    }catch(err){
      console.error(err);
    }
  }
  const swapToken1withToken2 = async(event) =>{
    event.preventDefault();
    try{
  const signer = await getSignerOrProvider(true);
    const myContract = new Contract(SwapAddress , Swapabi , signer);
    const _tokenMinted = await myContract.buytoken1WithToken2(input);
      console.log(success);

    }catch(err){
      console.error(err);
    }

  }
  const connectWallet = async () =>{
    try{
          await getSignerOrProvider();
      setwalletConnected(true);
    }catch(err){
      console.error(err);
    }
  }
  React.useEffect(()=>{
    if(!walletConnected){
      ModelRef.current = new Web3Modal({
        networks:"arbitrum-goerli",
        providerOptions:{},
        disabledInjectedProvider:false,
      })
      connectWallet();
       getBlanceTokenAmanDevToken();
    }
  },[walletConnected]);
  return (
    <>
    <Head>
    <title>ENVO migration</title>
    </Head>
    <header class="text-gray-600 body-font">
  <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
      <span class="ml-3 text-xl">ENVO migration</span>
    </a>
    <nav class="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
    <Link href="/reverseSwap" legacyBehavior>
      <a class="mr-5 hover:text-gray-900">Swap Token2-Token1</a>
    </Link>
    </nav>
    <button onClick={connectWallet} class="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"><img className="h-5 w-5 mr-2" src="favicon.png" />{walletConnected ? "Connected" : "Connect Wallet"}
    </button>
  </div>
</header>
    <section class=" h-[700px] text-gray-600 body-font relative">
  <div class="container px-5 py-24 mx-auto">
    <div class="flex flex-col text-center w-full mb-12">
      <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900"> ENVO migration Swap</h1>
      <p class="lg:w-2/3 mx-auto leading-relaxed text-base">Here you can swap Token1 to Token2</p>
    </div>
    <div class="lg:w-1/2 md:w-2/3 mx-auto">
    <form onSubmit={swapToken1withToken2}>
      <div class="flex flex-wrap -m-2">
        <div class="p-2 w-1/2">
          <div class="relative">
            <label for="name" class="leading-7 text-sm text-gray-600">Token1</label>
            <input type="number" onChange={handleChange} id="name" name="name" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" required/>
          </div>

        </div>
        <div class="p-2 w-1/2">
          <div class="relative">
            <label for="email" class="leading-7 text-sm text-gray-600">Token2</label>
            <input type="number" id="name" name="name" disabled = {true} class=" w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors  duration-200 ease-in-out" placeholder={input} />
          </div>
        </div>
        <div class="p-2 w-full">
          <button type="submit" class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Swap</button>
        </div>
        <div class="p-2 w-full pt-8 mt-8  text-center">
          <a class="text-indigo-500"></a>
          <p class="leading-normal my-5">
          </p>
        </div>
      </div>
    </form>
    </div>
  </div>
</section>
    </>
  )
}
