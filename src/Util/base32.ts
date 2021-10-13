export class Base32 {

    charJson: any = {
        '0' : 'A',
        '1' : 'B',
        '2' : 'C',
        '3' : 'D',
        '4' : 'E',
        '5' : 'F',
        '6' : 'G',
        '7' : 'H',
        '8' : 'I',
        '9' : 'J',
        '10' : 'K',
        '11' : 'L',
        '12' : 'M',
        '13' : 'N',
        '14' : 'O',
        '15' : 'P',
        '16' : 'Q',
        '17' : 'R',
        '18' : 'S',
        '19' : 'T',
        '20' : 'U',
        '21' : 'V',
        '22' : 'W',
        '23' : 'X',
        '24' : 'Y',
        '25' : 'Z',
        '26' : '2',
        '27' : '3',
        '28' : '4',
        '29' : '5',
        '30' : '6',
        '31' : '7'
    }

    /**
     * 
     * @param {Uint8Array} input 
     */
    encode(input: any){
        if(typeof input == 'undefined' || input == null){
            return null;
        }
        var aAscii2 = [];
        for(const ascii of input){
            var ascii2 = ascii.toString(2);
            var gap = 8 - ascii2.length;
            var zeros = '';
            for(var i = 0; i < gap; i++){
                zeros = '0' + zeros;
            }
            ascii2 = zeros + ascii2;
            
            aAscii2.push(ascii2);
        }
        
        var source = aAscii2.join('');
        
        var eArr = [];
        for(var x = 0; x < source.length; x += 5){
            var s5 = source.substring(x, x + 5);
            if(s5.length < 5){
                var gapB = 5 - s5.length;
                var zerosB = '';
                for(var gi = 0; gi < gapB; gi++){
                    zerosB += '0';
                }
                s5 += zerosB;
            }
            
            var eInt = parseInt(s5, 2)
            
            eArr.push(this.charJson[eInt]);
        }
        if(eArr.length % 8 !== 0){
            var gapC = 8 - (eArr.length % 8);
            for(var ix = 0; ix < gapC; ix++){
                eArr.push('=');
            }
        }
        var eStr = eArr.join('');
        
        return eStr;
    }

}