function code() {
    const titlesForTable = 'ADFGVX';
    const symbols = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let tableOfChanges = [];

    function createTable() {   
        tableOfChanges = [];     
        const sortSymbols = symbols.split('').sort(() => Math.random() - 0.5);
        const size = 6;
        for (let i = 0; i < size; i++) {
            const row = [];

            for (let j = 0; j < size; j++) {
                row.push(sortSymbols[i * size + j]);
            }
            tableOfChanges.push(row);
        }
    }

    function toEncodeText(text, keyWord) {
        text = text.toUpperCase();
        modifText = '';
        for (let i = 0; i < text.length; i++) {
            let x = -1;
            let y = -1;

            for (let r = 0; r < tableOfChanges.length; r++) {
                for (let c = 0; c < tableOfChanges[0].length; c++) {
                    if (text[i] == tableOfChanges[r][c]) {
                        x = r;
                        y = c;
                        break;
                    }
                }
                if (x !== -1) break;
            }
            if (x !== -1 && y !== -1) {
                modifText += (titlesForTable[x] + titlesForTable[y]);
            } else {
                modifText += text[i];
            }
        }
        textMatr = []
        keyLen = keyWord.length

        for (let i = 0; i < modifText.length; i += keyLen) {
            let row = [];
            for (j = 0; j < keyLen; j++) {
                if (modifText[i+j]) {
                    row.push(modifText[i+j]);
                } else {
                    row.push(' ');
                }                
            }
            textMatr.push(row);
        }
        let sortedKeyWord = keyWord.split('').sort().join('');
        let arrOfOrderSort = [];

        for (let i = 0; i < keyLen; i++) {
            for (let j = 0; j < keyLen; j++) {
                if (sortedKeyWord[i] == keyWord[j] && !arrOfOrderSort.includes(j)) {
                    arrOfOrderSort.push(j);
                }
            }
        }
        let resultText = ''

        for (let i = 0; i < keyLen; i++) {
            for (let j = 0; j < textMatr.length; j++) {
                resultText += textMatr[j][arrOfOrderSort[i]] || ' ';
            }
        }   
        return resultText;     
    }

    function toDecodeText(text, keyWord) {
        let keyLen = keyWord.length;
        let textMatr = [];
        let colsLen = text.length / keyLen;
        for (let i = 0; i < colsLen; i++) {
            textMatr[i] = [];
        }
        for (let i = 0; i < keyLen; i++) {
            for (let j = 0; j < colsLen; j++) {
                textMatr[j][i] = text[i*colsLen + j]
            }
        }
        let sortedKeyWord = keyWord.split('').sort().join('');
        let arrOfOrderSort = [];

        for (let i = 0; i < keyLen; i++) {
            for (let j = 0; j < keyLen; j++) {
                if (sortedKeyWord[j] == keyWord[i] && !arrOfOrderSort.includes(j)) {
                    arrOfOrderSort.push(j);
                }
            }
        }
        let textString = ''

        for (let i = 0; i < textMatr.length; i++) {
            for (let j = 0; j < keyLen; j++) {
                textString += textMatr[i][arrOfOrderSort[j]] || ' ';
            }
        }   
        let resultText = '';
        let i = 0
        let index = 0;
        while (i < textString.length) {            
            if(textString[i] !== ' ' && textString[i+1] !== ' ') {
                index = 0;
                let x = titlesForTable.split('').findIndex(letter => textString[i] == letter);
                let y = titlesForTable.split('').findIndex(letter => textString[i+1] == letter);
                resultText += tableOfChanges[x][y];
                i += 2;
            } else { 
                i += 1;
                index += 1;
                if (index == 1) { resultText += ' '}
            }
        }
        return resultText.toLowerCase();
    }

    const encodeButton = document.querySelector('#encodeButton');
    const decodeButton = document.querySelector('#decodeButton');
    
    const areaOfOrigText = document.querySelector('#originalText');
    const areaOfResultText = document.querySelector('#resultText');
    const keyWordArea = document.querySelector('#keyWord');
    
    encodeButton.addEventListener('click', () => {
        var origText = areaOfOrigText.value;
        var keyWord = keyWordArea.value;
        if(origText && keyWord) {
            createTable();
            const resultText = toEncodeText(origText, keyWord);
            areaOfResultText.innerHTML = '';
            areaOfResultText.innerHTML = resultText;
        }
    });
    
    decodeButton.addEventListener('click', () => {
        var text = areaOfOrigText.value;
        var keyWord = keyWordArea.value;
        if(text && keyWord && tableOfChanges[1][1]) {
            const resultText = toDecodeText(text, keyWord);
            areaOfResultText.innerHTML = '';
            areaOfResultText.innerHTML = resultText;
        }
    });


}
code()