angular.module('AnalizadorLexico', [])
    .controller('Controller', function($scope, $http) {
        var app = this;
        app.textString = "";
        app.listResult;
        app.verifySintaxis = function() {
            app.listResult = [];
            var listSplit = split(app.textString);
            var countParentesis = 0;
            for (let i = 0; i < listSplit.length; i++) {
                var vecline = [];
                if ((For.test(listSplit[i]) == true && number.test(listSplit[i]) == true) || While.test(listSplit[i]) == true) {
                    countParentesis++;
                    console.log(countParentesis + "for o while");
                } else if (string.test(listSplit[i]) == true || number.test(listSplit[i]) == true || character.test(listSplit[i]) == true) {
                    vecline = divideLine(listSplit[i]);
                    for (let j = 0; j < vecline.length; j++) {
                        if (typesData[vecline[j]] !== undefined) {
                            bombeo(vecline[j + 1], i);
                            break;
                        }
                    }
                } else if (If.test(listSplit[i]) == true) {
                    countParentesis++;
                    console.log(countParentesis + "if");
                } else if (derecho.test(listSplit[i]) == true) {
                    countParentesis--;
                    console.log(countParentesis);
                } else {
                    app.listResult.push(`linea ${(i + 1)}: error de sintaxis `);
                }
            }
            if (countParentesis > 0) {
                app.listResult.push(`falta parentesis derecho`);
            } else if (countParentesis < 0) {
                app.listResult.push(`sobra parentesis derecho`);
            }

            /*
                        for (let i = 0; i < listSplit.length; i++) {
                            if (WordRerserve[listSplit[i]] !== undefined) {
                                app.listResult.push(WordRerserve[listSplit[i]] + " : Es una palabra reserveda");
                            } else if (Operator[listSplit[i]] !== undefined) {
                                app.listResult.push(listSplit[i] + "  " + Operator[listSplit[i]]);
                            } else {
                                app.listResult.push(listSplit[i] + " : Identificador");
                            }
                        }*/
        }

        function split(words) {
            var wordSplit = words.split('\n');
            return wordSplit;
        }

        function divideLine(line) {
            var text = line.replace(/[\s]+/g, " ").trim();
            var wordSplit = text.split(" ");
            return wordSplit;
        }

        function cutword(listSplit) {
            var array
            for (let i = 0; i < listSplit.length; i++) {}

        }

        function bombeo(word, i) {
            console.log(i);
            if (word.length > 2 && (WordRerserve[word] === undefined)) {
                var indexChar = Math.floor((word.length) / 2);
                aplyBombeo(word, indexChar, i);
            } else if (word.length < 3) {
                app.listResult.push(`linea ${(i + 1)}: ${word} no cumple condiciones para aplicar lema del bombeo`);
            } else {
                app.listResult.push(`linea ${(i + 1)}: ${word} palabra reservada del sistema`);
            }
        }

        function aplyBombeo(word, index, j) {
            var str = '';
            var bombeo = "";
            var cadena = "";
            for (let i = 0; i < 10; i++) {
                bombeo = setCharAt(word, index, str);
                cadena += bombeo
                if (WordRerserve[bombeo] !== undefined) {
                    app.listResult.push(`linea ${(j + 1)}: La variable ${word} aplicando lema de bombeo con  n = ${i} da como resultado
                        una palabra reservada del sistema : ${bombeo}`);
                    app.listResult.push(cadena);
                    break;
                }
                str = str + word.charAt(index);
            }
        }

        function setCharAt(str, index, chr) {
            if (index > str.length - 1) return str;
            return str.substr(0, index) + chr + str.substr(index + 1);
        }

        String.prototype.replaceAt = function(index, replacement) {
            return this.substr(0, index) + replacement + this.substr(index + replacement.length);
        }
    });