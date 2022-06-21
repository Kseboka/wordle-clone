import { useState } from 'react'

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0)
  const [currentGuess, setCurrentGuess] = useState('')
  const [guesses, setGuesses] = useState([])
  const [history, setHistory] = useState([])
  const [isCorrect, setIsCorrect] = useState(false)

  // format guess into an array of letter objects
  const formatGuess = () => {
    let solutionArray = [...solution]
    let formmattedGuess = [...currentGuess].map((letter) => {
      return {
        key: letter,
        color: 'grey',
      }
    })

    // find any green letters
    formmattedGuess.forEach((letter, index) => {
      if (solutionArray[index] === letter.key) {
        formmattedGuess[index].color = 'green'
        solutionArray[index] = null
      }
    })

    // find any yellow letters
    formmattedGuess.forEach((letter, index) => {
      if (solutionArray.includes(letter.key)) {
        if (letter.color !== 'green') {
          formmattedGuess[index].color = 'yellow'
          solutionArray[solutionArray.indexOf(letter.key)] = null
        }
      }
    })

    return formmattedGuess
  }

  // add a new guess to the guesses state
  // update the isCorrect state if the guess is correct
  // add one to the turn state
  const addNewGuess = (currentGuess) => {}

  // handle keyup event & track current guess
  // if user presses enter, add the new guess
  const handleKeyup = ({ key }) => {
    if (key === 'Enter') {
      // only add guess if turn is less than 5
      if (turn > 5) {
        console.log('you used all your turns')
        return
      }
      // do not allow duplicate words
      if (history.includes(currentGuess)) {
        console.log('you used that word already')
        return
      }
      // check word is 5 chars long
      if (currentGuess.length !== 5) {
        console.log('the word has to be 5 letters')
        return
      }
      const formatted = formatGuess()
      console.log(formatted)
    }

    if (key === 'Backspace') {
      setCurrentGuess((prev) => {
        return prev.slice(0, -1)
      })
      return
    }

    if (/^[a-zA-Z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => {
          return prev + key
        })
      }
    }
  }

  return { turn, currentGuess, guesses, isCorrect, handleKeyup }
}

export default useWordle
