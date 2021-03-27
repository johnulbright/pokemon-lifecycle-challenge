import React, { Component } from 'react'
import './PokeFetch.css';


class PokeFetch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',
      timeLeft:10,
      brightness:0,
      started:false
  

    }
    this.countDown=this.countDown.bind(this);
    this.fetchPokemon=this.fetchPokemon.bind(this);
    this.updateTimer=this.updateTimer.bind(this);


  }
 
  fetchPokemon() {
    this.setState({
      timeLeft:10,
      brightness:0,
    })
    let min = Math.ceil(1);
    let max = Math.floor(152);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: 'GET'
    }).then(res => res.json())
      .then(res => {
        this.countDown();
        this.setState({
          pokeInfo: res,
          pokeSprite: res.sprites.front_default,
          pokeName: res.species.name,
          started:true
        })
      })
      .catch((err) => console.log(err))

  }
  updateTimer=(x)=>{
    this.setState({timeLeft:this.state.timeLeft-1})
        let tempTime;
    if (this.state.timeLeft>0){
      tempTime=this.state.timeLeft
    } else {
      tempTime=0
      this.setState({brightness:100})
      clearInterval(x);
    }
    this.setState({timeLeft:tempTime});
    console.log(this.state)
  }
 countDown(){
   console.log(this.state);
    let x=setInterval(()=>{
      this.updateTimer(x);
    },1000);
  }
  render() {
    return (
      <div className={'wrapper'}>
        <button className={'start'} onClick={() => this.fetchPokemon()}>Start!</button>
        
        <div className={'pokeWrap'}>
        {this.state.started&&this.state.brightness==100&&<h1 className={'pokeName'}>{this.state.pokeName}</h1>}
          {this.state.started&&this.state.brightness<100&&<h1 className={'pokeName'} >{this.state.timeLeft}</h1>}
          <img className={'pokeImg'} src={this.state.pokeSprite} style={{filter:`brightness(${this.state.brightness}%)`}}/>
         
        </div>
      </div>
    )
  }
}

export default PokeFetch;