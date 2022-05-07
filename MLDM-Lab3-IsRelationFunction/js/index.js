
/*
set1: a b c d
set2: 1 2 3 4
relation: a 1, a 3, b 2, b 5, b 3,
 */

function isRelationFunction(set1, relation)
{
    for(let i = 0; i < set1.length; i++)
    {
        let meetingCount = 0;
        for(let j = 0; j < relation.length; j++)
        {
            if(set1[i] === relation[j][0])
            {
                meetingCount++;
                if(meetingCount > 1)
                    return false;
            }
        }
    }
    return true;
}

function getDescription()
{
    let set1 = document.getElementById('set1').value.split(" ");
    let set2 = document.getElementById('set2').value.split(/\n| |,|/);
    let relation = document.getElementById('relation').value.split(', ');
    let output = document.getElementById('output');

    for(let i = 0; i < relation.length; i++)
        relation[i] = relation[i].split(' ');


    let errorCode = 0;
    for(let i = 0; i < relation.length; i++)
    {
        let set1Meeted = false;
        for(let j = 0; j < set1.length; j++)
            if(relation[i][0] === set1[j])
            {
                set1Meeted = true;
                break;
            }

        let set2Meeted = false;
        for(let j = 0; j < set2.length; j++)
            if(relation[i][1] === set2[j])
            {
                set2Meeted = true;
                break;
            }

        if(!set1Meeted && !set2Meeted )
            errorCode = 3;
        else if(!set2Meeted)
            errorCode = 2;
        else if(!set1Meeted)
            errorCode = 1;
    }

    if(errorCode === 3)
        output.innerText = "Some elements from relation are not present in set 1 and set 2"
    else if(errorCode === 2)
        output.innerText = "Some elements from relation are not present in set 2"
    else if(errorCode === 1)
        output.innerText = "Some elements from relation are not present in set 1"
    else if(errorCode === 0)
        if(isRelationFunction(set1, relation))
            output.innerText = "This is functional relation";
        else
            output.innerText = "This is not functional relation";
}