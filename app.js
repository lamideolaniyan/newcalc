/**
TO DO
- Get user selection
- Store selection
- Get user operation
- Compute user operation
- Get and store total score
- Display information on screen
*/

let calcArr = [];
let result = 0;
let displayArr = [];

const getDOM = {
	btnArr: Array.from(document.querySelectorAll('.calc__btn')),
	numBtnArr: Array.from(document.querySelectorAll('.num-btn')),
	screenTop: document.querySelector('.calc__screen--top'),
	screenBottom: document.querySelector('.calc__screen--bottom'),
};

const getUserInput = () => {
	/*
	 ITERATE THROUGH EACH BUTTON, ADD AN EVENTLISTENER AND PERFORM AN ACTION BASED ON THE TYPE OF BUTTON
	 - For numbers, get the value and store in a string
	 - For operators aside '=', push the number string into an array, get the operator and push into the array
	 - For '=', call a function to calculate the user input by joining the array into a string and using javascript eval function
	 */
	getDOM.btnArr.forEach((btn) => {
		btn.addEventListener('click', (e) => {
			if (e.target.dataset.type === 'num') {
				/* 
				CHECK THE CALC ARRAY FOR LAST ELEMENT. 
				- If it's a number, then it's the total from the previous calculation and DB will be reset 
				- If it's a string, then it is part of the current calculation
				*/
				typeof calcArr[calcArr.length - 1] === 'number'
					? (resetDB(),
					  // TESTING
					  calcArr.push(`${e.target.dataset.value}`))
					: // TESTING
					  calcArr.push(`${e.target.dataset.value}`);

				// RENDER DOM
				renderDOM(e.target.dataset.value, e.target.dataset.type);
			} else if (e.target.dataset.value === '=') {
				// TESTING
				calcNum();

				// RENDER DOM
				renderDOM(e.target.dataset.value, e.target.dataset.type);
				console.log(calcArr);
			} else if (
				e.target.dataset.type === 'operator' &&
				e.target.dataset.value !== 'clear'
			) {
				calcArr.push(e.target.dataset.value);
				console.log(calcArr);

				// RENDER DOM
				renderDOM(e.target.dataset.value, e.target.dataset.type);
			} else if (e.target.dataset.value === 'clear') {
				resetDB();
				// RENDER DOM
				renderDOM(e.target.dataset.value, e.target.dataset.type);
			}
		});
	});
};

const calcNum = () => {
	result = eval(calcArr.join(''));
	// TESTING
	calcArr.push(result);
	console.log(result);
};

const disableNum = () => {
	getDOM.numBtnArr.forEach((btn) => {
		btn.classList.add('disabled');
		btn.disabled = true;
	});
};

const enableNum = () => {
	getDOM.numBtnArr.forEach((btn) => {
		btn.classList.remove('disabled');
		btn.disabled = false;
	});
};

const resetDB = () => {
	calcArr = [];
	result = 0;
};

const renderDOM = (operator, opType) => {
	if (
		opType === 'operator' &&
		operator !== '=' &&
		typeof calcArr[0] === 'number'
	) {
		calcArr[0] = '' + calcArr[0];
		getDOM.screenTop.textContent = calcArr
			.join('')
			.replaceAll('*', 'x')
			.replaceAll('/', '÷')
			.replaceAll('/100', '%');
	} else if (opType === 'num' || (opType === 'operator' && operator !== '=')) {
		displayArr = calcArr.filter((e) => typeof e !== 'number');
		getDOM.screenTop.textContent = displayArr
			.join('')
			.replaceAll('*', 'x')
			.replaceAll('/', '÷')
			.replaceAll('/100', '%');
	} else if (operator === '=') {
		getDOM.screenBottom.textContent = calcArr[calcArr.length - 1];
		calcArr = [result];
	}
};

getUserInput();
