arr = [3,4,2,5,6,1,7,9]

def quick(arr):
    if len(arr) < 2:
        return arr

    pivot = arr[0]

    less = [i for i in arr[1:] if i <= pivot]
    greater = [i for i in arr[1:] if i > pivot]

    return quick(less) + [pivot] + quick(greater)

print(quick(arr))
