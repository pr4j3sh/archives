arr = [1,2,3,4,5,6,7,8,9]

def bnrysrch(arr, i, j, e):
    if i>j:
        return False

    m = i + (j-i)//2
    if e == arr[m]:
        return True
    elif e > arr[m]:
        return bnrysrch(arr, m+1,j,e)
    else:
        return bnrysrch(arr, i,m-1,e)


print(bnrysrch(arr,0,9, 0))
