#include <stdio.h>

int main(void) {
    char input;
    int scan_result; 
    
    printf("문자를 입력하세요: ");
    scan_result = scanf("%c", &input);
    
    if (scan_result != 1) {
        printf("입력 오류가 발생했습니다.\n");
        return 1;  
    }
    
    printf("입력한 문자는 %c, 아스키코드는 %d입니다.\n", input, input);
    
    char *ptr = &input; 
    printf("입력한 문자의 메모리 주소는 %p입니다.\n", (void*)ptr);
    
    return 0;
}
