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
const getDOM = { btnArr: Array.from(document.querySelectorAll('.calc__btn')) };
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
				calcArr.push(numStr);
				calcNum();
				console.log(calcArr);

				// RETURN RESULT
				// STORE RESULT IN ARRAY
			} else if (e.target.dataset.type === 'operator') {
				calcArr.push(numStr);
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
				calcArr = [];
				numStr = '';
				console.log(result);
				break;
			case '+':
				result = acc * 1 + calcArr[ind + 1] * 1;
				calcArr = [];
				numStr = '';
				console.log(result);
				break;
			case '-':
				result = acc * 1 - calcArr[ind + 1] * 1;
				calcArr = [];
				numStr = '';
				console.log(result);
				break;
			case '/':
				result = (acc * 1) / (calcArr[ind + 1] * 1);
				calcArr = [];
				numStr = '';
				console.log(result);
				break;
		}
	});
};
getUserInput();
