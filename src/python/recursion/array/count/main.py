arr = [1,2,3,4,5]

def cnt(arr):
    if arr == []:
        return 0
    return 1 + cnt(arr[1:])

print(cnt(arr))
    



