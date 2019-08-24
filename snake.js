class snake {
    constructor(rows, cols) {
        this.rows = rows
        this.cols = cols
        this.head = this.tail = null
        //不需要存储整个身体，因为蛇前进实际上只动了头和尾
        this.direct = ['A', 'V', '<', '>']
        //分别表示上下左右
        this.map = Array(this.rows).fill(0).map(it => Array(this.cols).fill(0))
        //先生成的行要赋0 因为map会忽略空项
    }

    generateHead() {
        let row = (this.rows - 2) * Math.random() | 0
        let col = (this.cols - 2) * Math.random() | 0
        //控制一下生成位置的范围
        row = row < 2 ? 2 : row
        col = col < 2 ? 2 : col

        let direct = this.direct.sort(() => Math.random() - 0.5)[0]
        //随机生成初始时的方向
        this.map[row][col] = direct
        this.head = [row, col]
        this.tail = [row, col]
    }

    generateApple() {
        let row = this.rows * Math.random() | 0
        let col = this.cols * Math.random() | 0
        if(this.map[row][col] === 0) {
            this.map[row][col] = 'Q'
        } else {
            this.generateApple()
        }
    }

    nextStep() {
        let originTail = [this.tail[0], this.tail[1]]
        let eatApple = false
        let headDirect = this.map[this.head[0]][this.head[1]]
        let tailDirect = this.map[this.tail[0]][this.tail[1]]
        let newHead

        switch(headDirect) {
            case 'A':
                newHead = [this.head[0] - 1, this.head[1]]
                break
            case 'V':
                newHead = [this.head[0] + 1, this.head[1]]
                break
            case '<':
                newHead = [this.head[0], this.head[1] - 1]
                break
            case '>':
                newHead = [this.head[0], this.head[1] + 1]
        }
         if(newHead[0] >= this.rows || newHead[0] < 0 || newHead[1] >= this.cols || newHead[1] < 0 || ![0, 'Q'].includes(this.map[newHead[0]][newHead[1]])) {
            //符号判断放在最后为了控制报错
            //当蛇碰到自己或者越界时抛出错误
            alert('You failed')
            throw new Error()
            //抛出错误终止程序
        } else if(this.map[newHead[0]][newHead[1]] === 'Q') {
            eatApple = true
        }
        this.head = newHead
        this.map[this.head[0]][this.head[1]] = headDirect
        //前进一格

        if(eatApple) {
            //吃了苹果不需要动tail,但要生成新apple
            this.generateApple()
        } else {
            //没吃需要tail指针向原方向移动一格，原位置置0
            switch(tailDirect) {
                case 'A':
                    this.tail[0]--
                    break
                case 'V':
                    this.tail[0]++
                    break
                case '<':
                    this.tail[1]--
                    break
                case '>':
                    this.tail[1]++
            }
            this.map[originTail[0]][originTail[1]] = 0
        }
    }

    turnLeft() {
        this.map[this.head[0]][this.head[1]] = '<'
    }

    turnRight() {
        this.map[this.head[0]][this.head[1]] = '>'
    }

    turnUp() {
        this.map[this.head[0]][this.head[1]] = 'A'
    }

    turnDown() {
        this.map[this.head[0]][this.head[1]] = 'V'
    }

    toString() {
        return '\n' + this.map.map(it => it.map(it => {if(it === 0){return '.'}; return it}).join(' ')).join('\n')
    }
}