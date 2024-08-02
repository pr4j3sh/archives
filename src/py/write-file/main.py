file_name = "output.txt"

word = "okay, i am sorry"

li = ""

for i in range(100):
    li+=(f"{i+1}. {word}\n")

f = open(file_name,"w")
f.write(li)

