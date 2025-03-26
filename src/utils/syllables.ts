// Spanish syllable division utilities

// Constants for Spanish phonology
const STRONG_VOWELS = 'aeoáéó'
const WEAK_VOWELS = 'iuíúü'
const ALL_VOWELS = STRONG_VOWELS + WEAK_VOWELS
const CONSONANT_GROUPS = ['bl', 'br', 'cl', 'cr', 'dr', 'fl', 'fr', 'gl', 'gr', 'pl', 'pr', 'tr']

/**
 * Divides a Spanish word into syllables following Spanish phonological rules.
 * Handles special cases like:
 * - Consonant groups (br, pl, etc.)
 * - Hiatus and diphthongs
 * - Stressed vowels
 * - H between vowels
 */
export const divideWordIntoSyllables = (word: string): string[] => {
  if (!word || word.trim() === '') return []

  // Normalize the word
  const normalizedWord = word.toLowerCase()

  // For very short words
  if (normalizedWord.length <= 2) {
    return [normalizedWord]
  }

  const syllables: string[] = []
  let currentSyllable = ''
  let i = 0

  const isVowel = (char: string) => ALL_VOWELS.includes(char)
  const isStrongVowel = (char: string) => STRONG_VOWELS.includes(char)
  const isStressed = (char: string) => /[áéíóú]/.test(char)

  while (i < normalizedWord.length) {
    currentSyllable += normalizedWord[i]

    if (isVowel(normalizedWord[i])) {
      if (i + 1 < normalizedWord.length) {
        const nextChar = normalizedWord[i + 1]

        // Handle 'h' between vowels
        if (nextChar === 'h' && i + 2 < normalizedWord.length && isVowel(normalizedWord[i + 2])) {
          currentSyllable += 'h'
          i++
          continue
        }

        // Check for vowel combinations
        if (isVowel(nextChar)) {
          const isHiatus = (
            (isStrongVowel(normalizedWord[i]) && isStrongVowel(nextChar)) ||
            isStressed(normalizedWord[i]) ||
            isStressed(nextChar)
          )

          if (!isHiatus) {
            // Diphthong - keep together
            currentSyllable += nextChar
            i++
          } else {
            // Hiatus - separate
            syllables.push(currentSyllable)
            currentSyllable = ''
          }
        } else if (nextChar !== 'h') {
          // Handle consonants after vowel
          if (i + 2 < normalizedWord.length) {
            const twoConsonants = nextChar + normalizedWord[i + 2]
            
            // Check for inseparable consonant groups
            if (CONSONANT_GROUPS.includes(twoConsonants)) {
              syllables.push(currentSyllable)
              currentSyllable = ''
            } else if (!isVowel(normalizedWord[i + 2])) {
              // Three consonants rule
              syllables.push(currentSyllable + nextChar)
              currentSyllable = ''
              i++
            } else {
              // Regular consonant between vowels
              syllables.push(currentSyllable)
              currentSyllable = ''
            }
          }
        }
      }
    }

    i++

    // Handle end of word or consonant sequences
    if (i === normalizedWord.length || (
      i < normalizedWord.length &&
      !isVowel(normalizedWord[i]) &&
      currentSyllable.length > 0
    )) {
      syllables.push(currentSyllable)
      currentSyllable = ''
    }
  }

  // Add any remaining syllable
  if (currentSyllable) {
    syllables.push(currentSyllable)
  }

  return syllables
}