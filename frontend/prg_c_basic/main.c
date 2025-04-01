#include <stdio.h>


void function(int *pArray){
  for(int i = 0; i < 5; i++){
    printf("함수 내부의 배열의 요소 pArray[%d]: %d\n", i, *(pArray + i));
  }
}

int main() {
  int array[] = {1,2,3,4,5};
  function(array);
  return 0;
}

