const stillNeeded = 167
const totalNeeded = 700
const daysLeft = 3
const otherDonors = 42

const percentRaised = 100 - Math.floor((stillNeeded / totalNeeded) * 100);
console.log(percentRaised)

const currentProgressBar = document.querySelector('.current-progress')
currentProgressBar.style.width = percentRaised + "%"

const quantityStillNeeded = document.querySelector('.quantity-still-needed')
quantityStillNeeded.innerHTML = '<b>$' + stillNeeded + '</b> still needed for this project'
quantityStillNeeded.style.setProperty('--pointer-position', ((percentRaised + 95) / 2) + '%')

const daysLeftText = document.querySelector('.days-left')
const otherDonorsText = document.querySelector('.other-donors')
daysLeftText.innerHTML = '<b>Only ' + daysLeft + ' days left</b> to fund this project'
otherDonorsText.innerHTML = 'Join the <b>' + otherDonors + '</b> other donors who have already supported this project. Every dollar helps.'


let quantity = document.querySelector('input[name=quantity')
const whyGive = document.querySelector('.why-give')
setGiveQuantity()

quantity.addEventListener('change', () => {
  setGiveQuantity()
  setReasons()
})

function setGiveQuantity() {
  whyGive.textContent = 'Why give ' + quantity.value + "$?"
}

const firstTier = "You'll get a Thank You note"
const secondTier = "You'll get a handwritten Thank You note in the mail"
const thirdTier = " and a gift basket"
const fourthTier = ", and you get to name a character in the game (no profanity, puns encouraged)"

let reasons = document.querySelector('.reasons')
setReasons()

whyGive.addEventListener('click', () => reasons.classList.toggle('shown'))

function setReasons() {
  switch (true) {
    case ((quantity.value < 10) && (quantity.value > 0)):
      reasons.innerHTML = firstTier + '...'
      break
    case ((quantity.value >= 10) && (quantity.value < 25)):
      reasons.innerHTML = secondTier + '...'
      break
    case ((quantity.value >= 25) && (quantity.value < 50)):
      reasons.innerHTML = secondTier + thirdTier + '...'
      break
    case ((quantity.value >= 50)):
      reasons.innerHTML = secondTier + thirdTier + fourthTier
      break
    default:
      reasons.innerHTML = 'Add an amount to see benefits'
  }
}

