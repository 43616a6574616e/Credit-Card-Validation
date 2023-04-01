const inputs = document.querySelectorAll('input')
const dashes = document.querySelectorAll('.dash')
const input1 = document.querySelector('.input1')
const input2 = document.querySelector('.input2')
const input3 = document.querySelector('.input3')
const input4 = document.querySelector('.input4')
const btn = document.querySelector('button')
const info = document.querySelector('.info')

const initialVerification = () => {
	
	const cardNumber = input1.value + input2.value + input3.value + input4.value

	if (!cardNumber) {

		info.textContent = 'enter your card number'
		info.style.color = 'gold'

	} else {
		
		if (cardNumber.length == 16 && (cardNumber.startsWith(51) || cardNumber.startsWith(52) || cardNumber.startsWith(53) || cardNumber.startsWith(54) || cardNumber.startsWith(55))) {

			let companyName = 'Mastercard'

			checkCardNumber(cardNumber, companyName)

		} else if ((cardNumber.length == 13 || cardNumber.length == 16) &&	cardNumber.startsWith(4)) {

			let companyName = 'Visa'

			checkCardNumber(cardNumber, companyName)

		} else if (cardNumber.length == 15 && (cardNumber.startsWith(34) || cardNumber.startsWith(37))) {

			let companyName = 'American Express'

			checkCardNumber(cardNumber, companyName)

		} else {

			info.textContent = 'wrong card number'
			info.style.color = 'tomato'

		}
	}
}

const checkCardNumber = (cardNumber, companyName) => {

	const card = cardNumber.split('')

	const weigh2 = []
	const weigh1 = []

	let length = card.length

	if (length % 2 === 0) {

		for (let i = length - 1; i >= 0; i--) {

			if (i % 2 !== 0) {

				weigh1.push(card[i])

			} else {

				weigh2.push(card[i] * 2)

			}
		}

	} else {

		for (let i = length - 1; i >= 0; i--) {

			if (i % 2 === 0) {

				weigh1.push(card[i])

			} else {

				weigh2.push(card[i] * 2)

			}
		}
	}


	const digits2 = weigh2.toString().replaceAll(',', '')
	const digits1 = weigh1.toString().replaceAll(',', '')
	let score2 = 0
	let score1 = 0

	for (let i = 0; i < digits2.length; i++) {

		score2 += parseInt(digits2[i])

	}

	for (let i = 0; i < digits1.length; i++) {

		score1 += parseInt(digits1[i])

	}

	const finalNumber = score1 + score2

	const checking = () => {

		if (finalNumber % 10 == 0) {

			return true

		} else {

			return false

		}
	}

	const legitCheck = checking()

	if (legitCheck) {

		info.textContent = `your card ${companyName} has been successfully verified!`
		info.style.color = 'lime'
		btn.style.visibility = 'hidden'

		dashes.forEach(dash => {
			dash.style.visibility = 'hidden'
		})

		inputs.forEach(input => {
			input.classList.add('positive')
			input.disabled = true
		})
	
	} else {

		info.textContent = `your card has not been successfully verified!`
		info.style.color = 'tomato'
		
	}
}

function move(fromNum) {

	const length = fromNum.value.length
	const maxLength = 4
	let counter

	if (length == maxLength) {

		if (fromNum.id == 'num1') {

			counter = 2
			document.getElementById(`num${counter}`).focus()

		} else if (fromNum.id == 'num2') {

			counter = 3
			document.getElementById(`num${counter}`).focus()

		} else if (fromNum.id == 'num3') {

			counter = 4
			document.getElementById(`num${counter}`).focus()
			
		}
	}
}

btn.addEventListener('click', initialVerification)
