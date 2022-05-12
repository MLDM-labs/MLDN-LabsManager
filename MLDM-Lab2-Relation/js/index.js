
function testFunction()
{
    let input_text = document.getElementById('input_text').value;
    document.getElementById("output_heading").innerHTML = input_text;
}

function isReflective(input_matrix, columnsCount, rawsCount)
{
    let elementsCount = columnsCount * rawsCount;
    let sameCoordsCount = Math.min(columnsCount, rawsCount);

    for(let i = 0; i < sameCoordsCount; i++)
    {
        let x = i;
        let y = i;

        let id = x + y * columnsCount;
        if(input_matrix[id] !== '1')
            return false;
    }
    return true;
}

function isSymmetrical(input_matrix, columnsCount, rawsCount)
{
    let input_length = input_matrix.length;
    for(let y = 0; y < rawsCount; y++)
    {
        for(let x = y; x < columnsCount; x++)
        {
            let id1 = x + y * columnsCount;
            let id2 = y + x * columnsCount;
            if(id2 >= input_length)
                break;
            if(input_matrix[id1] !== input_matrix[id2])
                return false;
        }
    }
    return true;
}

function isTransitive(input_matrix, columnsCount, rawsCount)
{
    let input_length = input_matrix.length;
    for(let aRbID = 0; aRbID < input_length; aRbID++)
    {
        let aRbValue = input_matrix[aRbID];
        if(aRbValue === "1")
        {
            let a = aRbID % columnsCount;
            let b = Math.ceil(aRbID / columnsCount) - 1;

            for(let c = 0; c < rawsCount; c++)
            {
                let id = b + c * columnsCount;
                if(input_matrix[id] === "1")
                {
                    let aRcID = a + c * columnsCount;
                    if(input_matrix[aRcID] === "0")
                        return false;
                }
            }
        }
    }
    return true;
}

function isAntiSymmetrical(input_matrix, columnsCount, rawsCount)
{
    let input_length = input_matrix.length;
    for(let y = 0; y < rawsCount; y++)
    {
        for(let x = y; x < columnsCount; x++)
        {
            let id1 = x + y * columnsCount;
            let id2 = y + x * columnsCount;
            if(id2 >= input_length)
                break;
            if(input_matrix[id1] === "1" && input_matrix[id2] === "1")
            {
                if(x !== y)
                    return false;
            }
        }
    }
    return true;
}

function getDescription()
{
    let input_matrix = document.getElementById('input_pairs').value
    let matrix_with_n = input_matrix.split(/\n/);
    let rawsCount = matrix_with_n.length;
    let columnsCount = matrix_with_n[0].split(/ |,|/).length;

    let splitedMatrix = input_matrix.split('\n');
    for(let i = 0; i < splitedMatrix.length; i++)
        splitedMatrix[i] = splitedMatrix[i].split(' ');

    if(rawsCount === 0 || rawsCount === 0)
    {
        let isNumber = true;
        for(let x = 0; x < splitedMatrix.length; x++)
            for(let y = 0; y < splitedMatrix[x].length; y++)
            {
                if(splitedMatrix[x][y] !== '0' && splitedMatrix[x][y] !== '1')
                {
                    isNumber = false;
                    break;
                }
            }
        if(!isNumber)
        {
            document.getElementById("output").innerHTML = "The matrix must consist of natural numbers from zero to one";
            return;
        }

        let isRectangular = true;
        for(let x = 1; x < splitedMatrix.length; x++)
        {
            if(splitedMatrix[x].length !== splitedMatrix[x - 1].length)
            {
                isRectangular = false;
                break;
            }
        }
        if(!isRectangular)
        {
            document.getElementById("output").innerHTML = "The matrix must be rectangular";
            return;
        }


        if((rawsCount > 0) && (columnsCount > 0))
        {
            let output = "This relation is";
            let beforeIsTrue = false;

            if(isReflective(input_matrix.split(/\n| |,|/), columnsCount, rawsCount))
            {
                output = output + " reflective";
                beforeIsTrue = true;
            }
            if(isSymmetrical(input_matrix.split(/\n| |,|/), columnsCount, rawsCount))
            {
                if(beforeIsTrue)
                    output = output + ", symmetrical";
                else
                    output = output + " symmetrical";
                beforeIsTrue = true;
            }
            if(isTransitive(input_matrix.split(/\n| |,|/), columnsCount, rawsCount))
            {
                if(beforeIsTrue)
                    output = output + ", transitive";
                else
                    output = output + " transitive";
                beforeIsTrue = true;
            }
            if(isAntiSymmetrical(input_matrix.split(/\n| |,|/), columnsCount, rawsCount))
            {
                if(beforeIsTrue)
                    output = output + ", antisymmetric";
                else
                    output = output + " antisymmetric";
                beforeIsTrue = true;
            }

            document.getElementById("output").innerHTML = output;
        }else
        {
            document.getElementById("output").innerHTML = "Please, enter the matrix";
        }
    }else
    {
        document.getElementById("output").innerHTML = "You need to enter the matrix";
    }

}