import random

obs = []

throws = 6

for i in range(throws):
    num = random.randint(1,6)
    obs.append(num)

print(obs)