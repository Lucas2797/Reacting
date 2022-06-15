


from random import randint


class ArrayChanger():
    array1 = [None, None, None, None, None]
    array2 = [None, None, None, None, None]


    def change_to_x(self):
        one = self.array2[randint(0, len(self.array2) - 1)]
        if one:
            self.array2[randint(0, len(self.array2) - 1)] = "X"
    

    def running(self):
        self.change_to_x()
        for elem, elem_index in self.array1:
            print(elem, elem_index)



ArrayChanger().running()





