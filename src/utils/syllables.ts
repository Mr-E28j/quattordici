// Spanish syllable division utilities

// Constants for Spanish phonology
const STRONG_VOWELS = 'aeoáéó'
const WEAK_VOWELS = 'iuíúü'
const ALL_VOWELS = STRONG_VOWELS + WEAK_VOWELS
const CONSONANT_GROUPS = ['bl', 'br', 'cl', 'cr', 'dr', 'fl', 'fr', 'gl', 'gr', 'pl', 'pr', 'tr']

export const divideWordIntoSyllables = (word: string): string[] => {
  if (!word || word.trim() === '') return []

  const normalizedWord = word.toLowerCase()
  if (normalizedWord.length <= 2) return [normalizedWord]

  const syllables: string[] = []
  let currentSyllable = ''
  let i = 0

  const isVowel = (char: string) => ALL_VOWELS.includes(char)
  const isStrongVowel = (char: string) => STRONG_VOWELS.includes(char)
  const isWeakVowel = (char: string) => WEAK_VOWELS.includes(char)
  const isStressed = (char: string) => /[áéíóú]/.test(char)

  while (i < normalizedWord.length) {
    currentSyllable += normalizedWord[i]

    // Vowel handling
    if (isVowel(normalizedWord[i])) {
      if (i + 1 < normalizedWord.length) {
        const nextChar = normalizedWord[i + 1]
        
        // Handle h between vowels
        if (nextChar === 'h' && i + 2 < normalizedWord.length && isVowel(normalizedWord[i + 2])) {
          currentSyllable += 'h'
          i++
          continue
        }

        // Vowel combinations
        if (isVowel(nextChar)) {
          const currentIsWeak = isWeakVowel(normalizedWord[i])
          const nextIsWeak = isWeakVowel(nextChar)
          
          // Determine if it's a hiatus
          const isHiatus = (
            (isStrongVowel(normalizedWord[i]) && isStrongVowel(nextChar)) ||
            (isStressed(normalizedWord[i]) && !currentIsWeak) ||
            (isStressed(nextChar) && !nextIsWeak) ||
            (currentIsWeak && nextIsWeak && (isStressed(normalizedWord[i]) || isStressed(nextChar)))
          )

          if (!isHiatus) {
            currentSyllable += nextChar
            i++
          } else {
            syllables.push(currentSyllable)
            currentSyllable = ''
          }
        } else if (nextChar !== 'h') {
          // Consonant handling after vowel
          if (i + 2 < normalizedWord.length) {
            const twoConsonants = nextChar + normalizedWord[i + 2]
            
            if (CONSONANT_GROUPS.includes(twoConsonants)) {
              syllables.push(currentSyllable)
              currentSyllable = ''
            } else if (!isVowel(normalizedWord[i + 2])) {
              syllables.push(currentSyllable + nextChar)
              currentSyllable = ''
              i++
            } else {
              syllables.push(currentSyllable)
              currentSyllable = ''
            }
          }
        }
      }
    }

    i++

    // End of word or consonant sequence handling
    if (i === normalizedWord.length || (
      i < normalizedWord.length &&
      !isVowel(normalizedWord[i]) &&
      currentSyllable.length > 0
    )) {
      syllables.push(currentSyllable)
      currentSyllable = ''
    }
  }

  if (currentSyllable) {
    syllables.push(currentSyllable)
  }

  return syllables
}