class Node:
    def __init__(self, data, next=None):
        self.data = data
        self.next = next


head = Node(1)

head.next = Node(2)

while head is not None:
    print(head.data)
    head = head.next
