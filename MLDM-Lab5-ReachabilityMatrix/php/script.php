<?php

class Matrix
{
    public $matrix = [];
    public $size;
    public $errorCode;

    public function __construct($size = 0, $matrix = [])
    {
        if (count($matrix) > 0)
            $this->matrix = $matrix;
        else
            $this->clear($this->matrix);
        $this->size = $size;
    }

    public function loadMatrix($matrixString)
    {
        $matrixElements = preg_split('/[ \n]/', $matrixString);
        $matrixSize = sqrt(count($matrixElements));
        if($matrixSize <= 1)
        {
            $this->errorCode = 404;
        }
        else{
            if ($matrixSize - (int)$matrixSize == 0) {
                $matrixArray = [];
                for ($i = 0; $i < $matrixSize * $matrixSize; $i++) {
                    $x = $i % $matrixSize;
                    $y = floor($i / $matrixSize);
                    $matrixArray[$x][$y] = $matrixElements[$i];
                }
                $this->size = $matrixSize;
                $this->matrix = $matrixArray;
            } else
                $this->errorCode = 1;
        }
    }

    public function multiplyMatrices($matrix1, $matrix2)
    {
        $resultMatrix = new Matrix($this->size);
        for ($resultY = 0; $resultY < $this->size; $resultY++)
            for ($resultX = 0; $resultX < $this->size; $resultX++) {
                $resultMatrix->matrix[$resultX][$resultY] = 0;
                for ($i = 0; $i < $this->size; $i++) {
                    $resultMatrix->matrix[$resultX][$resultY] += $matrix1[$i][$resultY] * $matrix2[$resultX][$i];
                }
            }
        return $resultMatrix;
    }

    public function multiply($anotherMatrix)
    {
        return $this->multiplyMatrices($this->matrix, $anotherMatrix->matrix);
    }

    public function isThisMatrixNull()
    {
        for ($y = 0; $y < $this->size; $y++)
            for ($x = 0; $x < $this->size; $x++) {
                if ($this->matrix[$x][$y] != 0)
                    return false;
            }
        return true;
    }

    public function isThisMatrixFilledWith($variable)
    {
        for ($y = 0; $y < $this->size; $y++)
            for ($x = 0; $x < $this->size; $x++) {
                if ($this->matrix[$x][$y] != $variable)
                    return false;
            }
        return true;
    }

    public function clear($variable)
    {
        for ($y = 0; $y < $this->size; $y++)
            for ($x = 0; $x < $this->size; $x++) {
                $this->matrix[$x][$y] = $variable;
            }
    }

    public function booleanOr($anotherMatrix)
    {
        $resultMatrix = new Matrix($this->size);
        for ($y = 0; $y < $this->size; $y++)
            for ($x = 0; $x < $this->size; $x++) {
                $val1 = $this->matrix[$x][$y];
                $val2 = $anotherMatrix->matrix[$x][$y];
                $val3 = (int)($val1 || $val2);
                $resultMatrix->matrix[$x][$y] = $val3;
            }
        return $resultMatrix;
    }

    public function printMatrix()
    {
        for ($y = 0; $y < $this->size; $y++) {
            for ($x = 0; $x < $this->size; $x++) {
                echo $this->matrix[$x][$y] . " ";
            }
            echo "<br>";
        }
    }

    public function getReachabilityMatrix()
    {
        if (!$this->isThisMatrixFilledWith(1)) {
            $reachabilityMatrix = new Matrix($this->size);
            $reachabilityMatrix = $reachabilityMatrix->booleanOr($this);
            $poweredMatrix = $this;

            $i = 0;
            while (($poweredMatrix->isThisMatrixNull() == false) && ($i < (int)$this->size)) {
                $poweredMatrix = $poweredMatrix->multiply($this);
                $reachabilityMatrix = $reachabilityMatrix->booleanOr($poweredMatrix);
                $i++;
            }
            return $reachabilityMatrix;
        } else
            return $this;
    }
}

function printError($errorCode)
{
    switch($errorCode)
    {
        case 1:
        {
            echo "The matrix must be squared.";
            break;
        }
        case 404:
        {
            echo "You need to enter matrix";
            break;
        }
    }
}

$inputMatrix = $_POST['matrix'];
echo "<br>";

$matrix = new Matrix();
$matrix->loadMatrix($inputMatrix);

if($matrix->errorCode == 0)
{
    $resultMatrix = $matrix->getReachabilityMatrix();

    if($resultMatrix->errorCode == 0)
    {
        $resultMatrix->printMatrix();
    }else printError($resultMatrix->errorCode);
}
else printError($matrix->errorCode);