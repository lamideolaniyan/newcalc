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
			const opType = e.target.dataset.type;
			const opValue = e.target.dataset.value;

			if (calcArr.length <= 25) {
				if (opType === 'num') {
					/* 
				CHECK THE CALC ARRAY FOR LAST ELEMENT. 
				- If it's a number, then it's the total from the previous calculation and DB will be reset 
				- If it's a string, then it is part of the current calculation
				*/
					typeof calcArr[calcArr.length - 1] === 'number'
						? (resetDB(), calcArr.push(`${opValue}`))
						: calcArr.push(`${opValue}`);

					renderDOM(opValue, opType);
				} else if (
					opType === 'operator' &&
					opValue !== 'clear' &&
					opValue !== '±' &&
					opValue !== 'del' &&
					opValue !== '='
				) {
					calcArr.push(opValue);
					console.log(calcArr);

					renderDOM(opValue, opType);
				} else if (opValue === '±') {
					calcArr[calcArr.length - 1] = '' + -calcArr[calcArr.length - 1]; //string of negative last number
					console.log(calcArr);
					renderDOM(opValue, opType);
				}
			}
			if (opValue === '=') {
				try {
					calcNum();
				} catch (e) {
					console.log(e);
					calcArr = ['Error'];
				}

				renderDOM(opValue, opType);
				console.log(calcArr);
			} else if (opValue === 'clear') {
				resetDB();
				renderDOM(opValue, opType);
			} else if (opValue === 'del') {
				calcArr.pop();
				renderDOM(opValue, opType);
			}
		});
	});
};

const calcNum = () => {
	result = eval(calcArr.join(''));

	if (result === undefined || result === NaN || result === Infinity) {
		calcArr = ['Error'];
	} else {
		calcArr.push(result);
		console.log(result);
	}
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

const renderDOM = (opValue, opType) => {
	if (
		opType === 'operator' &&
		typeof calcArr[0] === 'number' &&
		opValue !== '=' &&
		opValue !== 'clear'
	) {
		calcArr[0] = '' + calcArr[0]; // CHANGE 'result' TO STRING, IT'S THE FIRST ELEMENT IN calcArr AFTER '=' IS CLICKED
		getDOM.screenTop.textContent = replaceSign(calcArr);
	} else if (
		opType === 'num' ||
		(opType === 'operator' && opValue !== '=' && opValue !== 'clear')
	) {
		displayArr = calcArr.filter((e) => typeof e !== 'number');
		getDOM.screenTop.textContent = replaceSign(displayArr);
	} else if (opValue === '=') {
		let resultStr = calcArr[calcArr.length - 1].toString();
		console.log(resultStr.length);
		resultStr.length >= 17
			? ((getDOM.screenBottom.textContent =
					calcArr[calcArr.length - 1].toExponential()),
			  console.log(calcArr[calcArr.length - 1].toExponential()))
			: (getDOM.screenBottom.textContent = calcArr[calcArr.length - 1]);
		calcArr = [result];
	} else if (opValue === 'clear') {
		getDOM.screenBottom.textContent = '0';
		getDOM.screenTop.textContent = '';
	}
};

const replaceSign = (arr) =>
	arr
		.join('')
		.replaceAll('*', 'x')
		.replaceAll('/', '÷')
		.replaceAll('/100', '%');

getUserInput();
