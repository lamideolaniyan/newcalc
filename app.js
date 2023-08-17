/**
TO DO
- Get user selection
- Store selection
- Get user operation
- Compute user operation
- Get and store total score
- Display information on screen
*/

const database = {};
const getDOM = {
	btnArr: Array.from(document.querySelectorAll('.calc__btn')),
	numBtnArr: Array.from(document.querySelectorAll('.num-btn')),
};
let numStr = '';
let calcArr = [];
let result = 0;

let calcStr = '';
const getUserInput = () => {
	getDOM.btnArr.forEach((btn) => {
		btn.addEventListener('click', (e) => {
			if (e.target.dataset.type === 'num') {
				numStr += e.target.dataset.value;
			} else if (e.target.dataset.value === '=') {
				// DO CALCULATION
				numStr ? calcArr.push(numStr) : false;
				calcNum();
				console.log(calcArr);

				// RETURN RESULT
				// STORE RESULT IN ARRAY

				// DISABLE NUMBER BUTTONS
				disableNum();
			} else if (e.target.dataset.type === 'operator') {
				numStr ? calcArr.push(numStr) : false;
				calcArr.push(e.target.dataset.value);
				numStr = '';
				console.log(calcArr);
			}
		});
	});
};

const calcNum = () => {
	result = calcArr.reduce((acc, curr, ind) => {
		switch (curr) {
			case '*':
				result = acc * 1 * calcArr[ind + 1];
				calcArr = [result];
				numStr = '';
				console.log(result);
				break;
			case '+':
				result = acc * 1 + calcArr[ind + 1] * 1;
				calcArr = [result];
				numStr = '';
				console.log(result);
				break;
			case '-':
				result = acc * 1 - calcArr[ind + 1] * 1;
				calcArr = [result];
				numStr = '';
				console.log(result);
				break;
			case '/':
				result = (acc * 1) / (calcArr[ind + 1] * 1);
				calcArr = [result];
				numStr = '';
				console.log(result);
				break;
		}
	});
};

const disableNum = () => {
	getDOM.numBtnArr.forEach((btn) => {
		btn.classList.add('disabled');
		btn.disabled = true;
	});
};
getUserInput();
