arr = [34, 23,56,76,900,34,12,0]

def m(arr):
    if len(arr) == 1:
        return arr[0]
    i = m(arr[1:])
    if arr[0] >= i:
        return arr[0]
    else:
        return i

print(m(arr))
