//TODO: STEP 1 - Import the useState hook.
import React, { useState, useEffect } from "react"
import "./App.css"
import BottomRow from "./BottomRow"

function App() {
  //TODO: STEP 2 - Establish your applictaion's state with some useState hooks.  You'll need one for the home score and another for the away score.
  const [homeScore, setHomeScore] = useState(0)
  const [awayScore, setAwayScore] = useState(0)
  const [gameStarted, setGame] = useState(false)
  const [time, setTime] = useState({ s: 0, m: 0 })

  const scoreHandler = (team, score) => {
    if (team === "home") {
      setHomeScore(homeScore => homeScore + score)
    } else {
      setAwayScore(awayScore => awayScore + score)
    }
  }

  useEffect(() => {
    if (time.s >= 60)
      setTime(prevTime => ({
        ...prevTime,
        m: prevTime.m + 1,
        s: 0
      }))

    const timer = setInterval(() => {
      setTime(prevTime => ({ ...prevTime, s: prevTime.s + 1 }))
    }, 1000)

    console.log(time)

    return () => clearInterval(timer)
  }, [time])

  return (
    <div className="container">
      <section className="scoreboard">
        <div className="topRow">
          <div className="home">
            <h2 className="home__name">Lions</h2>

            {/* TODO STEP 3 - We need to change the hardcoded values in these divs to accept dynamic values from our state. */}

            <div className="home__score">{homeScore}</div>
          </div>
          <div className="timer">
            {String(time.m).padStart(2, 0)}:{String(time.s).padStart(2, 0)}
          </div>
          <div className="away">
            <h2 className="away__name">Tigers</h2>
            <div className="away__score">{awayScore}</div>
          </div>
        </div>
        <BottomRow />
      </section>
      <section className="buttons">
        <div className="homeButtons">
          {/* TODO STEP 4 - Now we need to attach our state setter functions to click listeners. */}
          <button
            onClick={() => scoreHandler("home", 7)}
            className="homeButtons__touchdown"
          >
            Home Touchdown
          </button>
          <button
            onClick={() => scoreHandler("home", 3)}
            className="homeButtons__fieldGoal"
          >
            Home Field Goal
          </button>
        </div>
        <div className="awayButtons">
          <button
            onClick={() => scoreHandler("away", 7)}
            className="awayButtons__touchdown"
          >
            Away Touchdown
          </button>
          <button
            onClick={() => scoreHandler("away", 3)}
            className="awayButtons__fieldGoal"
          >
            Away Field Goal
          </button>
        </div>
      </section>
    </div>
  )
}

export default App
