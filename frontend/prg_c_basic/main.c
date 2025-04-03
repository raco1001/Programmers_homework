#include <stdio.h>
#include <string.h>
#include <stdlib.h>


int main() {
  int num;
  int *student;

  printf("학생 수를 입력하세요: ");
  scanf("%d", &num);

  student = (int*)malloc(sizeof(int) * num);

  if(student == NULL){
    printf("메모리가 할당되지 않았습니다.\n");
    return 0;
  }

  printf("할당된 메모리의 크기는 %lu바이트입니다.\n", sizeof(int)*num);

  free(student);
  return 0;
}

