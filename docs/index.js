(function(){
var Board = {

    emptySlots(board) {
        var e = []
        for (i = 0; i < 9; i++) {
            if (board[i][0] != "X" && board[i][0] != "O") {
                e.push(i)
            }
        }
        return e
    },

    drawBoard(board) {
        for (let x = 0; x < HEIGHT; x++) {
            let drawX = ""
            for (let y = 0; y < WIDTH; y++) {

                let draw = board[(x * WIDTH) + y]
                if (draw == "") draw = " "
                drawX = drawX + draw
            }
            console.log("|" + drawX + "|" + "         " + (x + 1))

        }
        console.log(" ‾‾‾ ")
    },


    randomizeBoard: function(board) {
        for (let i = 0; i < board.length; i++) {
            let result = randInt(-1, 1)
            if (result == 1) {
                board[i] = "X"
            } else if (result == -1) {
                board[i] = "O"
            } else {
                board[i] = ""
            }
        }
        return board
    },

    compressBoard: function(board) {
        let fenBoard = "",
            lastPiece = "",
            checkLastUpdate = false
        for (let i = 0; i < board.length; i++) {
            let piece = board[i]
            if (piece == "") piece = "_"
            checkLastUpdate = false
            if (lastPiece[0] == piece) {
                lastPiece = `${lastPiece[0]}${parseInt(lastPiece[1])+1}`
            } else {
                fenBoard = fenBoard + lastPiece + "/"
                lastPiece = `${piece}1`
                checkLastUpdate = true
            }

        }
        fenBoard = fenBoard + lastPiece + "/"


        return fenBoard
    },

    decompressBoard: function(board) {
        let splitArray = board.split("/"),
            returnArray = new Array()
        for (let i = 1; i < splitArray.length - 1; i++) {
            const split = splitArray[i];
            for (let i = 0; i < parseInt(split[1]); i++) {
                let push = split[0]
                if (split[0] == "_") push = ""
                returnArray.push(push)
            }
        }
        return returnArray
    },

    flipBoard: function(board) {
        var temBoard = [...board]
        for (let i = 0; i < temBoard.length; i++) {
            if (temBoard[i] == "X") temBoard[i] = "A"

        }
        for (let i = 0; i < temBoard.length; i++) {
            if (temBoard[i] == "O") temBoard[i] = "X"
            if (temBoard[i] == "A") temBoard[i] = "O"

        }

        return temBoard
    },

    upsetMove(move) {

        return move
    }
}





var intervals = {}

var currency = {
        "tics": 10,
        "tacs": 0,
        "toes": 0,
        "tempToes": 0,
    },
    gameTier = {
        state: 1,
        cost: "5 toes",
    }

window.makePurchase = function(cost) {
    var num = parseInt(cost.split(" ")[0]),
        curr = cost.split(" ")[1]

    if (currency[curr] >= num) {
        currency[curr] -= num
        return true
    }




    return false
}
var toeEncomny = {
    costs: {
        gain: 1,
        speed: 1,
        skill: 1,
    },
    stats: {
        gain: 1,
        speed: 1,
        skill: 1,
    }
}
window.startEncomny = {
        costs: {
            "boards": {
                "basic": "17.8 tics",
                "gold-basic": "1000 tics",
                "1d": "1500 tics",
                "numerical": "3000 tics",

            },
            "ais": {
                "jai": "15 tics",
                "baby": "20 tics",
                "mid": "30 tics",
                "adult": "90 tics",
                "genius": "350 tics",

                "tactotic-c": "100 tics",
                "tac&tictotoe-c": "2500 tics",
            }

        },
        startingStats: {
            "boards": {
                "basic": {
                    "skill": 0.85,
                    "speed": 300,
                    "disadvantage": 0,
                },
                "gold-basic": {
                    "skill": 0.2,
                    "speed": 3000,
                    "disadvantage": 0.6,
                },
                "1d": {
                    "skill": 0.9,
                    "speed": 250,
                    "disadvantage": 0,
                },
                "numerical": {
                    "skill": 0.85,
                    "speed": 250,
                    "disadvantage": 0,
                }
            },
            "ais": {
                "jai": {
                    skill: 0.25,
                    speed: 700,
                },
                "baby": {
                    skill: 2,
                    speed: 700,
                },
                "mid": {
                    skill: 4,
                    speed: 700,
                },
                "adult": {
                    skill: 4.5,
                    speed: 1000,
                },
                "genius": {
                    skill: 10,
                    speed: 700,
                },

                "tactotic-c": {
                    skill: null,
                    speed: 1500,
                },
                "tac&tictotoe-c": {
                    skill: null,
                    speed: 5000,
                },
            }
        },
        production: {
            ais: {
                "tactotic-c": {
                    input: ["1 tacs"],
                    output: ["1 tics"]
                },
                "tac&tictotoe-c": {
                    input: ["50 tics"],
                    output: ["1 tempToes"]
                }
            },
            boards: {
                "basic": [
                    "1 tacs",
                    "1 tacs",
                    "1 tics",
                ],
                "gold-basic": [
                    "1 tacs",
                    "1 tacs",
                    "1 tempToes",
                ],
                "1d": [
                    "0 tacs",
                    "1 tics",
                    "2 tics",
                ],
                "numerical": [
                    "0 tacs",
                    "3 tacs",
                    "10 tics",
                ],
            },
        },
        tierReq: {
            "boards": {
                "basic": 1,
                "gold-basic": 1,
                "1d": 2,
                "numerical": 3,

            },
            "ais": {
                "jai": 1,
                "baby": 1,
                "mid": 1,
                "adult": 2,
                "genius": 3,

                "tactotic-c": 1,
                "tac&tictotoe-c": 2,
            }

        }

    }
    window.encomny = JSON.parse(JSON.stringify(startEncomny))

window.multiplyCost = function(cost, float) {
    var num = cost.split(" ")[0],
        curr = cost.split(" ")[1]

    var num = (Math.round(num * float))

    //num = roundCostToFormat(num)
    console.log(num)


    return `${num} ${curr}`
}

function roundCostToFormat(value) {
    var g = ["", "K", "M", "B", "T", "Qa", "Qt", "Sx", "Sp", "Oc", "No", "Dc", "UDc", "DDc", "TDc", "QaDc", "QtDc", "SxDc", "SpDc", "ODc", "NDc", "Vg", "UVg", "DVg", "TVg", "QaVg", "QtVg", "SxVg", "SpVg", "OVg", "NVg", "Tg", "UTg", "DTg", "TTg", "QaTg", "QtTg", "SxTg", "SpTg", "OTg", "NTg", "Qd", "UQd", "DQd", "TQd", "QaQd", "QtQd", "SxQd", "SpQd", "OQd", "NQd", "Qi", "UQi", "DQi", "TQi", "QaQi", "QtQi", "SxQi", "SpQi", "OQi", "NQi", "Se", "USe", "DSe", "TSe", "QaSe", "QtSe", "SxSe", "SpSe", "OSe", "NSe", "St", "USt", "DSt", "TSt", "QaSt", "QtSt", "SxSt", "SpSt", "OSt", "NSt", "Og", "UOg", "DOg", "TOg", "QaOg", "QtOg", "SxOg", "SpOg", "OOg", "NOg", "Nn", "UNn", "DNn", "TNn", "QaNn", "QtNn", "SxNn", "SpNn", "ONn", "NNn", "Ce"]

    if (typeof value === 'string') {
        var num = value.split(" ")[0],
            curr = value.split(" ")[1],

            splitSh = sh(num).split(" "),

            exp = g.indexOf(splitSh[1])
        if (exp == -1) exp = 0


        return `${Math.pow(10, exp*3)*parseFloat(splitSh[0])} ${curr}`
    } else {

        var splitSh = sh(value).split(" "),
            exp = g.indexOf(splitSh[1])
        if (exp == -1) exp = 0


        return Math.pow(10, exp * 3) * parseFloat(splitSh[0])

    }
}

window.ais = new Array()

function listAi(ele, id, type) {
    var newAi = new(function(ele, id) {

        this.ele = ele
        this.type = type
        this.id = id
        this.stats = {
            speed: encomny["startingStats"]["ais"][id].speed,
            missRates: {
                "basic": 0.9,
            },
            globalSkill: 1,
            learningRate: encomny["startingStats"]["ais"][id].skill
        }

        this.cooldown = 1

        this.costs = {
            speed: "5 tics",
            skill: "50 tics",
        }

        this.attachedBoard = undefined

        this.train = function(boardType, rate) {
                this.stats.missRates[boardType] *= 0.99875
            }
            //ai.costs.speed = multiplyCost(ai.costs.speed, 1.6)
            //ai.costs.skill = multiplyCost(ai.costs.skill, 1.8)


        return this
    })(ele, id)
    ais.push(newAi)

    ele.aiObject = newAi
    return newAi
}

setInterval(() => {
    updateConverterAis()
}, 1);

function updateConverterAis() {
    for (let i = 0; i < ais.length; i++) {
        const ai = ais[i];
        if (ai.type == "converter") {
            ai.cooldown -= 1 / ai.stats.speed
            ai.ele.children[3].style.width = `${(1-Math.max(ai.cooldown, 0))*85}px`

            if (ai.cooldown <= 0) {
                var production = encomny.production.ais[ai.id],
                    canConvert = true

                for (let i = 0; i < production.input.length; i++) {
                    const int = production.input[i];
                    var num = parseInt(int.split(" ")[0]),
                        curr = int.split(" ")[1]

                    if (currency[curr] < num) {
                        canConvert = false
                        break
                    }

                }

                if (canConvert) {
                    for (let i = 0; i < production.input.length; i++) {
                        const int = production.input[i];
                        var num = parseInt(int.split(" ")[0]),
                            curr = int.split(" ")[1]

                        currency[curr] -= num

                    }
                    for (let i = 0; i < production.output.length; i++) {
                        const int = production.output[i];
                        var num = parseInt(int.split(" ")[0]),
                            curr = int.split(" ")[1]

                        currency[curr] += num * (toeEncomny.stats.gain)

                    }

                    ai.cooldown = 1
                }


            }
        }
    }
}

document.getElementById("toeShop").style.display = "none"
document.getElementById("toeShopButton").onclick = function() {
    document.getElementById("toeShop").style.display = ""
}
document.getElementById("toeShopClose").onclick = function() {
    document.getElementById("toeShop").style.display = "none"
}
document.getElementById("helpMenu").style.display = "none"
document.getElementById("helpMenuButton").onclick = function() {
    document.getElementById("helpMenu").style.display = ""
}
document.getElementById("helpClose").onclick = function() {
    document.getElementById("helpMenu").style.display = "none"
}





document.getElementById("restartButton").onclick = function() {
    if (confirm("Are sure you want to restart????????????")) {
        restartGame()
        currency = {
            "tics": 10,
            "tacs": 0,
            "toes": 0,
            "tempToes": 0,
        }
        achievementProgress = [50, 0]
        gameTier = {
            state: 1,
            cost: "5 toes",
        }
        toeEncomny = {
            costs: {
                gain: 1,
                speed: 1,
                skill: 1,
            },
            stats: {
                gain: 1,
                speed: 1,
                skill: 1,
            }
        }
    }
}


document.getElementById("presigeButton").onclick = function() {
    if (confirm(`Are sure you want to restart?\nYou will get ${currency.tempToes} toes`)) restartGame();
}

document.getElementById("upgradeTierButton").onclick = function() {
    if (makePurchase(gameTier.cost)) {
        gameTier.state += 1
        gameTier.cost = multiplyCost(gameTier.cost, 5)
    }
}


function restartGame() {
    currency.toes += currency.tempToes
    currency = {
        "tics": 10,
        "tacs": 0,
        "toes": currency["toes"],
        "tempToes": 0,
    }

    ais = new Array()


    var boardBin = document.getElementById("boardBin"),
        len = boardBin.children.length
    for (let i = 0; i < len; i++) {
        const ai = boardBin.children[len - i - 1];

        ai.remove()
    }

    for (let i = 0; i < Object.keys(intervals).length; i++) {
        clearTimeout(intervals[Object.keys(intervals)[i]])
    }

    var aiHolders = document.getElementsByClassName("aiHolder")
    for (let i = 0; i < aiHolders.length; i++) {
        const holder = aiHolders[i];

        var len = holder.children.length
        for (let i = 0; i < len; i++) {
            const ai = holder.children[len - i - 1];

            ai.remove()
        }
    }

    encomny = JSON.parse(JSON.stringify(startEncomny))


    buyBoard("basic", true)


}

function registerGame(production, num) {
    console.log(production)
    var gain = production[num + 1],
        num = parseInt(gain.split(" ")[0]),
        type = gain.split(" ")[1]

    achievementProgress[1] += num * toeEncomny.stats.gain

    currency[type] += num * toeEncomny.stats.gain
}

function sh(value) {
    if (typeof value === 'string') {
        var num = value.split(" ")[0],
            curr = value.split(" ")[1]

        return `${(new ADNotations.StandardNotation().format(num, 2, 0))} ${curr}`
    }
    return new ADNotations.StandardNotation().format(value, 2, 0)
}

function updateGameCurrencyDisplay() {
    var div = document.getElementById("currencyDiv")
    div.children[0].childNodes[0].textContent = `Tics: ${sh(currency["tics"])}`
    div.children[1].textContent = `Tacs: ${sh(currency["tacs"])}`
    div.children[2].textContent = `Toes: ${sh(currency["toes"])}`
    div.children[3].childNodes[0].textContent = ` + ${sh(currency["tempToes"])} Toes `

    document.getElementsByTagName("title")[0].textContent = `Idle Noughts - ${sh(currency.tics)} Tics`
    document.getElementById("toeShopToeDisplay").textContent = `${sh(currency.toes)} Toes`

    document.getElementById("toeShopTierDisplay").textContent = `Tier ${gameTier.state}`
    document.getElementById("upgradeTierButton").innerHTML = `Upgrade Tier<br>${gameTier.cost}`

    document.getElementById("toeShopButton").innerHTML = `Toe Shop<br><b>Tier ${gameTier.state}</b>`


    document.getElementById("boardCapDiv").innerHTML = `${document.getElementById("boardBin").children.length}/9 Boards`

    var tooltip = div.children["tooltip"].innerHTML = `<p>Ti:${currency.tics}</p><p>Ta:${currency.tacs}</p><p>To:${currency.toes}</p>`



}

var updateGameCurrencyDisplayLoop = setInterval(() => {
    updateGameCurrencyDisplay()
}, (1000 / 60));


function updateAisDisplay() {

    for (let i = 0; i < ais.length; i++) {
        const ai = ais[i];
        if (ai.type != "board") {
            var speedDisplay = ai.ele.children[2],
                toeSpeedBuff = 10 / (toeEncomny.stats.speed + 10)
            speedDisplay.children[0].textContent = `Speed: ${round(1000/(ai.stats.speed*toeSpeedBuff), 1)}ps`

            continue
        }


        var aiSelects = ai.ele.children[2].children[3]
        for (let i = 0; i < aiSelects.children.length; i++) {
            const child = aiSelects.children[i];
            var boardType = child.textContent.split(":")[0]
            child.textContent = `${boardType}: ${round((1-ai.stats.missRates[boardType.toLowerCase()])*ai.stats.globalSkill, 3)}`
        }

        var speedDisplay = ai.ele.children[2],
            toeSpeedBuff = 10 / (toeEncomny.stats.speed + 10)
        speedDisplay.children[0].textContent = `Speed: ${round(1000/(ai.stats.speed*toeSpeedBuff), 1)}ps`


    }
}

var updateAisDisplayLoop = setInterval(() => {
    updateAisDisplay()
}, (1000 / 30));

function updateBoardsDisplay() {
    var boards = document.getElementById("boardBin").children
    for (let i = 0; i < boards.length; i++) {
        const board = boards[i];

        var toeSpeedBuff = 10 / (toeEncomny.stats.speed + 10)


        board.children[3].children[0].textContent = `Speed: ${round(1000/board.stats.speed, 0)}`
        board.children[3].children[3].textContent = `Skill: ${round(board.stats.missRate, 2)}`


    }
}

var updateBoardsDisplayLoop = setInterval(() => {
    updateBoardsDisplay()
}, (1000 / 30));


function updateToeDisplay() {
    var toesSection = document.getElementById("toeShop"),
        upgrades = toesSection.children[1].children

    for (let i = 2; i < upgrades.length; i++) {
        const button = upgrades[i];
        var upgrade = button.children[0].textContent.toLowerCase()

        button.children[1].textContent = `${round(toeEncomny.stats[upgrade], 1)}`

        button.children[3].textContent = `${round(toeEncomny.costs[upgrade], 1)} Toes`

    }
}
(function() {
    var toesSection = document.getElementById("toeShop"),
        upgrades = toesSection.children[1].children

    for (let i = 2; i < upgrades.length; i++) {
        const button = upgrades[i];


        button.onclick = function() {
            var upgrade = this.children[0].textContent.toLowerCase()
            if (makePurchase(`${toeEncomny.costs[upgrade]} toes`)) {
                toeEncomny.stats[upgrade] *= {
                    gain: 2,
                    speed: 1.5,
                    skill: 1.15,
                }[upgrade]
                toeEncomny.costs[upgrade] *= 6
            }
        }
    }
})()

setInterval(() => {
    updateToeDisplay()
}, (1000 / 30));



function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();

    // Change this to div.childNodes to support multiple top-level nodes.
    return div.firstChild;
}

window.mouseClickGameTile = function(ev, num) {

    var board = ev.parentElement.parentElement
    if (
        board.turn == "X" &&
        ((ev.textContent[0] == "X" || ev.textContent[0] == "O") ? ev.textContent[0] : "") == "" &&
        board.children[2].children.length < 1 &&
        board.type != "gold-basic"
    ) {

        var sucsess = board.makeMove(board.children[1], num, "X", true)
        board.turn = "O"
        if (!sucsess) {

            intervals["mouseClick"] = setTimeout(() => {
                board.makeAiMove(board, "O")
            }, board.stats.speed)
        }
    }


}

function mouseClickGameTileNumerical(ev, num) {

    var board = ev.parentElement.parentElement.parentElement
    if (
        board.turn == "X" &&
        ((ev.textContent[0] == "X" || ev.textContent[0] == "O") ? ev.textContent[0] : "") == "" &&
        board.children[2].children.length < 1 &&
        board.type != "gold-basic"
    ) {

        var area = board.children[1],
            tile = ev

        value = tile.textContent[0]
        area.children[1].appendChild(tile)
        board.turn = "O"

        if (value != "" && board.turn == "O") {
            intervals["numericalMouseClick"] = setTimeout(() => {


                var result = evaluteNumericalBoard(board, "X"),
                    foundTile = null

                if (result.move == undefined) {
                    board.children[1].innerHTML = document.getElementById("presetBoard-numerical").children[0].children[1].innerHTML

                } else
                if (result.winner[0] == 0) {
                    for (let i = 0; i < area.children[0].children.length; i++) {
                        const tile = area.children[0].children[i];

                        if (tile.textContent[0] == result.move + 1) {
                            foundTile = tile
                            break
                        }
                    }

                    if (foundTile != null) {
                        area.children[2].appendChild(foundTile)
                    }
                    board.turn = "X"


                } else {
                    if (result.winner[0] == 1) {
                        area.children[1].textContent = `${result.winner[1][0]}+${result.winner[1][1]}+${result.winner[1][2]}=15`
                    } else {
                        area.children[2].textContent = result.winner[1]
                    }





                }
            }, board.stats.speed)

            var result = evaluteNumericalBoard(board, "X"),
                foundTile = null

            console.log("1", result)
            if (result.winner[0] != 0) {
                intervals["numericalMouseClick"] = setTimeout(() => {
                    board.children[1].innerHTML = document.getElementById("presetBoard-numerical").children[0].children[1].innerHTML
                }, board.stats.speed)

            }
        }
    }


}

function testNumericalBins(bin1, bin2) {
    var a = bin1
    if (a.length >= 3) {
        for (let i = 0; i < a.length; i++) {
            const num1 = a[i];
            for (let j = 0; j < a.length; j++) {
                const num2 = a[j];
                for (let l = 0; l < a.length; l++) {
                    const num3 = a[l];
                    if (!(
                            [num2, num3].includes(num1) || [num3, num1].includes(num2) || [num1, num2].includes(num3)
                        )) {
                        if ((num2 + num3 + num1) == 15) {
                            return [1, [num1, num2, num3]]
                        }
                    }
                }

            }
        }
    }
    a = bin2
    if (a.length >= 3) {
        for (let i = 0; i < a.length; i++) {
            const num1 = a[i];
            for (let j = 0; j < a.length; j++) {
                const num2 = a[j];
                for (let l = 0; l < a.length; l++) {
                    const num3 = a[l];
                    if (!(
                            [num2, num3].includes(num1) || [num3, num1].includes(num2) || [num1, num2].includes(num3)
                        )) {
                        if ((num2 + num3 + num1) == 15) {
                            return [-1, [num1, num2, num3]]
                        }
                    }
                }

            }
        }
    }
    return [0]
}

function evaluteNumericalBoard(board, turn, missRate) {
    var area = board.children[1],
        bin1 = area.children[1],
        bin2 = area.children[2]


    function collapseBin(bin) {
        var a = new Array()
        for (let i = 0; i < bin.children.length; i++) {
            const child = bin.children[i];
            a.push(parseInt(child.textContent[0]))
        }
        return a
    }

    var aiMove = makeNumericalAiMove({
                area: collapseBin(area.children[0]),
                bin1: collapseBin(bin1),
                bin2: collapseBin(bin2)
            },
            ((turn == "X") ? ["_", "O", "X"] : ["_", "X", "O"]),
            missRate


        ),
        test = testNumericalBins(collapseBin(bin1), collapseBin(bin2))

    return {
        move: aiMove,
        winner: test,
    }


}

function makeNumericalAiMove(boardDat, playerTokens, missRate) {
    var board = ["", "", "", "", "", "", "", "", ""],
        conversion = [1, 6, 5, 8, 4, 0, 3, 2, 7]




    boardDat.area.forEach((e) => {
        board[conversion.indexOf(e - 1)] = playerTokens[0]
    })
    boardDat.bin1.forEach((e) => {
        board[conversion.indexOf(e - 1)] = playerTokens[1]
    })
    boardDat.bin2.forEach((e) => {
        board[conversion.indexOf(e - 1)] = playerTokens[2]
    })
    var emptySlots = Board.emptySlots(board)

    var move = lookup3b3[Board.compressBoard(board)]
    if (move != null) {

        var move = ((Math.random() > missRate) ? emptySlots[randInt(0, emptySlots.length - 1)] : ((move.y * 3) + move.x))

        return conversion[move]
    }
}

function boardDivToArray(board) {
    var returnArray = new Array()
    for (let i = 0; i < board.children.length; i++) {
        const tile = board.children[i];
        returnArray.push((tile.textContent[0] == "X" || tile.textContent[0] == "O") ? tile.textContent[0] : "")

    }

    return returnArray
}

function testBoard(production, board) {
    var gameTiles = boardDivToArray(board.children[1]),
        winner = undefined;

    (["X", "O"]).forEach(turn => {
        var winMoves = {
            "basic": [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6],
            ],
            "gold-basic": [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6],
            ],
            "1d": [
                [0, 1, 2],
                [1, 2, 3],
                [2, 3, 4],
                [3, 4, 5],
                [4, 5, 6],
                [5, 6, 7],
                [6, 7, 8],
                [7, 8, 9],
            ]
        }[board.type]
        for (let i = 0; i < winMoves.length; i++) {
            const win = winMoves[i];
            var correctTiles = 0
            for (let j = 0; j < win.length; j++) {
                const winNum = win[j];
                if (gameTiles[winNum] == turn) {
                    correctTiles += 1
                }
            }
            if (correctTiles >= 3) {
                winner = turn
                break

            }
        }
    });
    if (winner != undefined) {
        board.turn = " "
        registerGame(production, (winner == "X") ? 1 : -1)
        intervals["resetGameTie"] = setTimeout(() => {
            board.parentElement.reset(board)
        }, board.stats.speed);
    }

    return winner

}

function aiBoardLoop(board, ai) {

    if (board.turn == "X") {
        if (ai.stats.missRates[board.type] == undefined) {
            ai.stats.missRates[board.type] = 0.9

        }

        ai.train(board.type, ai.stats.learningRate / 1000)
    }

    var aiSkill = 1 - ((1 - (ai.stats.missRates[board.type] * ai.stats.globalSkill)) * (1 - board.disadvantage))
    if (board.turn != " ") board.makeAiMove(board, board.turn, (board.turn == "X") ? aiSkill : board.stats.missRate)

    var toeSpeedBuff = 10 / (toeEncomny.stats.speed + 10)
    intervals["aiBoardLoop"] = setTimeout(() => {
        if (board.children[2].children.length >= 1) {

            aiBoardLoop(board, ai)
        }
    }, ((board.turn == "X") ? ai.stats.speed : board.stats.speed) * toeSpeedBuff);

}

function aiNumericalBoardLoop(board, ai) {
    if (board.turn == "X") {
        if (ai.stats.missRates[board.type] == undefined) {
            ai.stats.missRates[board.type] = 0.9

        }

        ai.train(board.type, ai.stats.learningRate / 1000)
    }

    var aiSkill = 1 - ((1 - (ai.stats.missRates[board.type] * ai.stats.globalSkill)) * (1 - board.disadvantage))

    if (board.turn != " ") {
        var result = evaluteNumericalBoard(board, board.turn, (board.turn == "X") ? aiSkill : board.stats.missRate)
        console.log(result)
        var area = board.children[1]
        if (result.move == undefined) {
            board.children[1].innerHTML = document.getElementById("presetBoard-numerical").children[0].children[1].innerHTML

        } else
        if (result.winner[0] == 0) {
            for (let i = 0; i < area.children[0].children.length; i++) {
                const tile = area.children[0].children[i];

                if (tile.textContent[0] == result.move + 1) {
                    foundTile = tile
                    break
                }
            }

            if (foundTile != null) {
                area.children[(board.turn == "X" ? 1 : 2)].appendChild(foundTile)
            }


        } else {
            if (result.winner[0] == 1) {

                area.children[1].textContent = `${result.winner[1][0]}+${result.winner[1][1]}+${result.winner[1][2]}=15`
            } else {
                area.children[2].textContent = `${result.winner[1][0]}+${result.winner[1][1]}+${result.winner[1][2]}=15`
            }
            registerGame(encomny.production.boards["numerical"], result.winner[0])

            board.children[1].innerHTML = document.getElementById("presetBoard-numerical").children[0].children[1].innerHTML


        }
        board.turn = (board.turn == "X") ? "O" : "X"

    }

    var toeSpeedBuff = 10 / (toeEncomny.stats.speed + 10)
    intervals["aiBoardLoop"] = setTimeout(() => {
        if (!(board.children[2].children.length < 1 && board.turn == "X")) {

            aiNumericalBoardLoop(board, ai)
        }
    }, ((board.turn == "X") ? ai.stats.speed : board.stats.speed) * toeSpeedBuff);

}


window.buyBoard = function(id, cost = false, details = {}) {
    console.log()
    details = {
        costs: {
            speed: "5 tics",
            skill: "10 tics",
        },
        stats: {
            speed: encomny.startingStats.boards[id].speed,
            missRate: encomny.startingStats.boards[id].skill,
        },
        id: `${Math.random()}`,
        slotId: `${Math.random()}`,
        ...details,
    }
    if (cost || (gameTier.state >= encomny.tierReq["boards"][id] && document.getElementById("boardBin").children.length < 9)) {
        if (cost || (makePurchase(encomny.costs.boards[id]))) {
            encomny.costs.boards[id] = multiplyCost(encomny.costs.boards[id], 1.15)
            var board = createElementFromHTML(document.getElementById(`presetBoard-${id}`).innerHTML),
                bin = document.getElementById("boardBin")



            board.children[2].id = details.slotId

            board.classList.add(`type-${id}`)
            var idid = details.id
            board.id = idid

            board.__proto__.makeMove = function(board, pos, team) {
                var gameBoard = board,
                    posNum = pos - 1,
                    gameTile = gameBoard.children[posNum]
                gameTile.textContent = team

                var production = encomny.production.boards[board.parentElement.type]



                return testBoard(production, gameBoard.parentElement)


            }
            board.__proto__.makeAiMove = function(board, team, missRate = 0.9) {
                var gameBoard = board.children[1]

                var production = encomny.production.boards[board.type]


                var boardArray = boardDivToArray(gameBoard),
                    compressedBoard = Board.compressBoard(boardArray),
                    correctMove = lookup1d[compressedBoard]

                if (correctMove == null) {
                    board.turn = " "
                    registerGame(production, 0)
                    intervals["aiMoveTie"] = setTimeout(() => {
                        board.parentElement.reset(board)
                    }, board.stats.speed);
                    return
                } else {
                    var correctNum = (correctMove.y * 3) + correctMove.x,
                        missHit = Math.random()
                    if (missRate > missHit) {
                        var emptyTiles = Board.emptySlots(boardArray),
                            randTile = emptyTiles[randInt(0, emptyTiles.length - 1)]
                        correctNum = randTile


                    }



                    var posNum = correctNum,
                        gameTile = gameBoard.children[posNum]

                    gameTile.textContent = team

                    gameBoard.parentElement.turn = (team == "X") ? "O" : "X"

                }

                testBoard(production, gameBoard.parentElement)

            }
            board.__proto__.reset = function(board) {
                var tiles = board.children[1].children
                for (let i = 0; i < tiles.length; i++) {
                    const tile = tiles[i];
                    tile.textContent = ""
                }
                board.turn = "X"

            }


            board.stats = details.stats
            board.costs = details.costs

            board.type = id

            board.children[0].childNodes[1].onclick = function() {
                this.parentElement.parentElement.remove()
                if (document.getElementById("boardBin").children.length <= 0) {
                    setTimeout(() => {
                        alert("¯\\_(ツ)_/¯")
                    }, 100);

                }
            }


            board.children[3].children[1].addEventListener("click", () => {
                var board = document.getElementById(idid)
                if (makePurchase(board.costs.speed)) {
                    board.stats.speed = 1000 / ((1000 / board.stats.speed) * 1.05)
                    board.costs.speed = multiplyCost(board.costs.speed, 1.15)
                    board.children[3].children[1].innerHTML = `Upgrade Speed +10%<br>${board.costs.speed}`
                }
            })
            board.children[3].children[4].addEventListener("click", () => {
                var board = document.getElementById(idid)
                if (makePurchase(board.costs.skill)) {
                    board.stats.missRate = (board.stats.missRate) * (0.9090909091)
                    board.costs.skill = multiplyCost(board.costs.skill, 1.1)

                    board.children[3].children[4].innerHTML = `Downgrade Skill -5%<br>${board.costs.skill}`
                }
            })
            board.disadvantage = encomny.startingStats.boards[id]["disadvantage"]


            board.turn = "X"

            bin.appendChild(board)
        }
    }
}

window.buyAI = function(id, type, name = names[randInt(0, names.length)]) {
    if (gameTier.state >= encomny.tierReq["ais"][id]) {
        if (makePurchase(encomny.costs.ais[id])) {
            encomny.costs.ais[id] = multiplyCost(encomny.costs.ais[id], 1.15)
            var board = createElementFromHTML(document.getElementById(`preset-${type}Ai`).innerHTML),
                bin = document.getElementById("botBinDiv")

            board.childNodes[1].textContent = name

            board.id = `${Math.random()}`

            board.classList.add(`typeAi-${id}`)


            board.getElementsByTagName("i")[0].textContent = `- ${id}`
            var newAi = listAi(board, id, type)
            newAi.name = name
            bin.appendChild(board)
        }
    }

}



document.getElementById("upgradeDivSpeedUp").onclick = function() {
    var div = this.parentElement,
        ai = div.children[0].children
    if (ai.length > 0) {
        ai = ai[0].aiObject

        if (makePurchase(ai.costs.speed)) {

            ai.stats.speed = Math.round(ai.stats.speed * 0.9090909091)
            ai.costs.speed = multiplyCost(ai.costs.speed, 1.2)

            div.children[2].innerHTML = `Upgrade Speed +10%<br>${ai.costs.speed}`
            div.children[3].innerHTML = `Upgrade Skill +10%<br>${ai.costs.skill}`
        }

    }

}
document.getElementById("upgradeDivSkillUp").onclick = function() {
    var div = this.parentElement,
        ai = div.children[0].children
    if (ai.length > 0) {
        ai = ai[0].aiObject
        if (makePurchase(ai.costs.skill)) {


            ai.stats.globalSkill = (ai.stats.globalSkill) * 1.1
            ai.costs.skill = multiplyCost(ai.costs.skill, 1.1)

            div.children[2].innerHTML = `Upgrade Speed +10%<br>${ai.costs.speed}`
            div.children[3].innerHTML = `Upgrade Skill +10%<br>${ai.costs.skill}`
        }

    }
}

function setUpgradeDiv() {
    var upgradeDiv = document.getElementById("botUpgradeDiv"),
        ai = upgradeDiv.children[0].children

    if (ai.length > 0) {
        ai = ai[0].aiObject

        upgradeDiv.children[2].innerHTML = `Upgrade Speed +10%<br>${ai.costs.speed}`
        upgradeDiv.children[3].innerHTML = `Upgrade Skill +10%<br>${ai.costs.skill}`
    } else {

    }



}

function getValue(ai) {
    var value = 5

    var keys = Object.keys(ai.stats.missRates)
    for (let i = 0; i < keys.length; i++) {
        var key = keys[i],
            rate = ai.stats.missRates[key]

        value += Math.floor((1 - rate) * 20 * ai.stats.globalSkill)

    }
    value += Math.floor((1000 / ai.stats.speed) * 50)
    return Math.round(value * 0.25)
}

function setRecycleDiv() {
    var recycleDiv = document.getElementById("botRecycleDiv"),
        ai = recycleDiv.children[0].children

    if (ai.length > 0) {
        ai = ai[0].aiObject


        recycleDiv.children[1].innerHTML = `Recycle<br>${getValue(ai)} tacs`

    } else {
        recycleDiv.children[1].innerHTML = `Recycle`
    }



}

document.getElementById("recycleButton").onclick = function() {
    var div = this.parentElement,
        ai = div.children[0].children
    if (ai.length > 0) {
        ai = ai[0]
        for (let i = 0; i < ais.length; i++) {
            const ai2 = ais[i];
            if (ai2.ele.id == ai.id) {
                ais.splice(i, 1)
                break
            }
        }
        makePurchase(`-${getValue(ai.aiObject)} tacs`)
        ai.remove()

    }
}

window.allowDrop = function(ev) {
    if (((ev.target.id == "botBinDiv") ? true : ev.target.children.length <= 0)) {
        if (true) {
            ev.preventDefault();
        }
    }
}

window.drag = function(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

window.drop = function(ev) {
    document.getElementById("upgradeDivSpeedUp").innerHTML = "Upgrade Speed"
    document.getElementById("upgradeDivSkillUp").innerHTML = "Upgrade Skill"
    if (true) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text"),
            aiDiv = document.getElementById(data)
        if (((ev.target.id == "botBinDiv") ? true : ev.target.children.length <= 1)) {
            ev.target.appendChild(aiDiv);

            aiDiv.aiObject.attachedBoard = ev.target.parentElement
            aiDiv.aiObject.droppedElement = ev.target
            var board = ev.target.parentElement
            if (board.classList[0] == "board") {
                if (board.classList[2] == "type-numerical") {
                    aiNumericalBoardLoop(board, aiDiv.aiObject)

                } else {
                    aiBoardLoop(board, aiDiv.aiObject)
                }
            }
            if (board.id == "botUpgradeDiv") {}
            setTimeout(() => {
                setUpgradeDiv()
                setRecycleDiv()
            }, 20);
        }




    }
}







window.onload = () => {

    function getConverterValues(array) {
        var s = ""
        for (let i = 0; i < array.length; i++) {
            const arr = array[i];
            s += `${arr}`
            if (i < array.length - 1) {
                s += " + "
            }
        }
        return s
    }

    function setAIBuy(id) {
        if (gameTier.state < encomny.tierReq["ais"][id]) {
            document.getElementById(`${id}-AiBuyDisplay`).parentElement.children["tooltip"].children["tierReqBox"].textContent = `Unlocked at Tier ${encomny.tierReq["ais"][id]}`
            document.getElementById(`${id}-AiBuyDisplay`).parentElement.classList.add("shaded")
        } else {
            document.getElementById(`${id}-AiBuyDisplay`).parentElement.children["tooltip"].children["tierReqBox"].textContent = ""
            document.getElementById(`${id}-AiBuyDisplay`).parentElement.classList.remove("shaded")
        }
        if (id[id.length - 2] == "-") {
            var production = encomny.production.ais[id]
            document.getElementById(`${id}-AiBuyDisplay`).innerHTML = `Speed:${encomny.startingStats.ais[id].speed}`
        } else {
            document.getElementById(`${id}-AiBuyDisplay`).innerHTML = `Learning Rate: ${encomny.startingStats.ais[id].skill}<br>Speed: ${encomny.startingStats.ais[id].speed}`
        }

        document.getElementById(`${id}-AiBuyDisplay`).parentElement.children[0].textContent = `${sh(encomny.costs["ais"][id])}`


    };



    function setBoardBuy(id) {
        if (gameTier.state < encomny.tierReq["boards"][id]) {
            document.getElementById(`${id}-BoardBuyDisplay`).children["tooltip"].children["tierReqBox"].textContent = `Unlocked at Tier ${encomny.tierReq["boards"][id]}`
            document.getElementById(`${id}-BoardBuyDisplay`).classList.add("shaded")
        } else {
            document.getElementById(`${id}-BoardBuyDisplay`).children["tooltip"].children["tierReqBox"].textContent = ""
            document.getElementById(`${id}-BoardBuyDisplay`).classList.remove("shaded")
        }
        document.getElementById(`${id}-BoardBuyDisplay`).children[0].textContent = sh(encomny.costs.boards[id])
        document.getElementById(`${id}-BoardBuyDisplay`).children[4].innerHTML = `Speed: ${round(encomny.startingStats.boards[id].speed, 3)}<br>Difficulty: ${round(1-encomny.startingStats.boards[id].skill, 3)}<br>Disadvantage: ${round(encomny.startingStats.boards[id].disadvantage, 3)}`
            /*
            document.getElementById(`${id}-BoardBuyDisplay`).children = document.getElementById(`${id}-BoardBuyDisplay`).textContent.replace("[skillNum]", encomny.startingStats["ais"][id].skill).replace("[speedNum]", encomny.startingStats["ais"][id].speed)
        
            document.getElementById(`${id}-BoardBuyDisplay`).parentElement.children[0].textContent = `${encomny.costs["ais"][id]}`
        
        
            */


    };

    setInterval(() => {
        (["basic", "gold-basic", "1d", "numerical"]).forEach((age) => {
            setBoardBuy(age)
        });
        (["jai", "baby", "mid", "adult", "genius", "tactotic-c", "tac&tictotoe-c"]).forEach((age) => {
            setAIBuy(age)
        })
    }, 50);





}

var achievementProgress = [50, 0]

function updateProgressBar() {
    document.getElementById("achievementProgressBar").value = `${(achievementProgress[1]/achievementProgress[0])*100}`
    if ((achievementProgress[1] / achievementProgress[0]) >= 1) {
        currency.tics += Math.floor(achievementProgress[0])
        achievementProgress[0] *= 5
        achievementProgress[1] = 0
    }

    var foot = document.getElementById("footer")
    foot.children[0].textContent = `Cash Bonus: ${achievementProgress[0]-achievementProgress[1]} tics left`
    foot.children[1].textContent = `${achievementProgress[1]}/${achievementProgress[0]} -> +${achievementProgress[0]} tics`

    document.getElementById("miniProgressBar").value = `${(achievementProgress[1]/achievementProgress[0])}`

}

setInterval(updateProgressBar, 50)
window.saveVersion = "v18"

window.getGameData = function() {
    var data = {
            saveVersion: saveVersion,
            currency: JSON.parse(JSON.stringify(currency)),
            encomny: JSON.parse(JSON.stringify(encomny)),
            toeEncomny: JSON.parse(JSON.stringify(toeEncomny)),
            gameTier: JSON.parse(JSON.stringify(gameTier)),

            boards: [],
            ais: [],

            achievementProgress: achievementProgress,
        },
        boards = document.getElementById("boardBin").children

    for (let i = 0; i < boards.length; i++) {
        const board = boards[i];
        data.boards.push({
            type: board.type,
            stats: board.stats,
            costs: board.costs,

            id: board.id,
            slotId: board.children[2].id

        })
    }


    for (let i = 0; i < ais.length; i++) {
        const ai = ais[i];
        data.ais.push({
            id: ai.ele.id,
            type: ai.type,
            stats: ai.stats,
            costs: ai.costs,

            name: ai.name,

            idid: ai.id,
            boardId: (ai.attachedBoard != undefined) ? ai.droppedElement.id : "botBinDiv",

        })
    }

    return data
}

window.loadGameData = function(data) {
    var saveDat = JSON.parse(data)
    console.log(saveDat)
    restartGame()
    currency = {
        "tics": 0,
        "tacs": 0,
        "toes": 0,
        "tempToes": 0,
    }
    if (saveDat.achievementProgress instanceof Array) {
        saveDat.achievementProgress = [50, 0]
    }
    achievementProgress = saveDat.achievementProgress

    saveDat.encomny.production = encomny.production
    saveDat.encomny.tierReq = encomny.tierReq
    saveDat.encomny.startingStats = encomny.startingStats

    currency = saveDat.currency
    toeEncomny = saveDat.toeEncomny
    encomny = saveDat.encomny
    gameTier = saveDat.gameTier


    document.getElementById("boardBin").children[0].remove()

    for (let i = 0; i < saveDat.boards.length; i++) {
        const board = saveDat.boards[i];

        buyBoard(board.type, true, board)
    }

    for (let i = 0; i < saveDat.ais.length; i++) {
        const ai = saveDat.ais[i];

        var board = createElementFromHTML(document.getElementById(`preset-${ai.type}Ai`).innerHTML),
            bin = document.getElementById(ai.boardId)

        board.id = ai.id

        board.classList.add(`typeAi-${ai.idid}`)


        board.childNodes[0].textContent = ai.name


        board.getElementsByTagName("i")[0].textContent = `- ${ai.idid}`

        var newAi = listAi(board, ai.idid, ai.type)

        newAi.stats = ai.stats
        newAi.costs = ai.costs
        newAi.name = ai.name

        newAi.attachedBoard = bin
        newAi.droppedElement = bin




        if (bin.parentElement.classList[0] == "board") {
            if (bin.parentElement.classList[2] == "type-numerical") {
                aiNumericalBoardLoop(bin.parentElement, board.aiObject)
            } else {
                aiBoardLoop(bin.parentElement, board.aiObject)
            }
        }
        if (bin.parentElement.id == "botUpgradeDiv") {
            setUpgradeDiv(board)
        }
        setRecycleDiv(board)

        bin.appendChild(board)
    }



}




var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {

            content.style.display = "none";
        } else {

            content.style.display = "block";
        }
    });
}

var mouse = {
    pos: v(),
    down: false,
}
document.addEventListener("mousemove", function(ev) {
    mouse.pos.x = ev.pageX
    mouse.pos.y = ev.pageY
})

setInterval(() => {
    var tooltips = document.getElementsByClassName("tooltiptext")
    for (let i = 0; i < tooltips.length; i++) {
        const tooltip = tooltips[i];
        tooltip.style.left = `${mouse.pos.x+50}px`
        tooltip.style.top = `${mouse.pos.y+50}px`

    }
}, (1000 / 30));


restartGame()

async function getBrowserId() {
    const uniqueId = await biri()
    return uniqueId
}



function saveGame() {
    var gameData = btoa(JSON.stringify(getGameData()))
    localStorage.setItem("date", gameData)
  
}

setInterval(function () {
getBrowserId().then(id => {
        const data = { "username": username, "browserId": id, "tics": atob(localStorage.getItem("username-highscore")), "tacs": String(currency.tacs), "toes":  String(currency.toes)};
        console.log(data)
        fetch('https://idle-noughts-api.onrender.com/post/update', {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    })
}, 30000);

localStorage.setItem("mainGameSave-DO_NOT_TOUCH", btoa("ajksl ndkjahbskld huasndiuyagnsyduaksgydbkuasbdygadisugaisuydgbuiaygsdyuiasgdbiuybgasiudbguyiasbdiuagsiuydbgaiuysdiuygasydganoisydbgasyid8obadgicnsoidngliaugd cliygneliygnclifwbvfrgdnskgrefvifwygoxiewyboiyfbweygivfoiydgvwbeiouhdfhouwebfchowe7ivfoiuwegdigbeiouhvfiouywrgeofi7vowgriuyercfgnoiywrgfixnyorgwfibvoweygvfwgcyiowegfvbgwoey"))
var save = localStorage.getItem("date")

if (save != null) {
    save = atob(save)
    if (JSON.parse(save).saveVersion == saveVersion) {
        loadGameData(save)
    } else {
        alert("Save version outdated\nrestarting progress\nnot soz")
    }
} else {
    saveGame()
    document.getElementById("helpMenu").style.display = ""

}

setInterval(() => {
    saveGame()
}, 1000);


window.addEventListener('beforeunload', function(e) {
    saveGame()

    e.preventDefault();
    e.returnValue = '';
});

setInterval(()=>{
    var highscore = localStorage.getItem("username-highscore")
    if (highscore == null) {
        highscore = 'MA=='
    }
    highscore = parseInt(atob(highscore))
    if (currency.tics > highscore) {
        localStorage.setItem("username-highscore", btoa(currency.tics))   
    }
}, 50)


var username = localStorage.getItem("username-idleNoughts") || prompt("Username?")

localStorage.setItem("username-idleNoughts", username)
document.getElementById("usernameButton").textContent = `Change Username: ${username}`

document.getElementById("usernameButton").onclick = function() {
    username = prompt("Username?")
    localStorage.setItem("username-idleNoughts", username)

    document.getElementById("usernameButton").textContent = `Change Username: ${username}`

}

})()
