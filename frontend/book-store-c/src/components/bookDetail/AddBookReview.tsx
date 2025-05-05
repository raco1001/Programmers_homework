import Button from '@/components/common/Button'
import { BookReviewItemWrite } from '@/models/book.model'
import { Theme } from '@/style/theme'
import { useForm } from 'react-hook-form'
import { styled } from 'styled-components'
interface IAddBookReviewProps {
  onAddReview: (data: BookReviewItemWrite) => void
}

function AddBookReview({ onAddReview }: IAddBookReviewProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<BookReviewItemWrite>()


  return (
    <AddBookReviewStyle>
      <form onSubmit={handleSubmit(onAddReview)}>
        <fieldset>
          <textarea {...register('review', { required: true })} placeholder="리뷰를 작성해주세요." />
          {errors.review && <p className="error">리뷰를 작성해주세요.</p>}
        </fieldset>
        <div className="submit">
          <fieldset>
            <label htmlFor="rating">평점</label>
            <select {...register('rating', { required: true, valueAsNumber: true })}>ㅑ
              <option value={1}>1 점</option>
              <option value={2}>2 점</option>
              <option value={3}>3 점</option>
              <option value={4}>4 점</option>
              <option value={5}>5 점</option>
            </select>
            <Button size="medium" schema="primary" type="submit">작성하기</Button>
          </fieldset>
        </div>
      </form>
    </AddBookReviewStyle>
  )
}

const AddBookReviewStyle = styled.div<{ theme: Theme }>`
  display: flex;
  flex-direction: column;
  gap: 6px;

  fieldset {
    border: 0;
    padding: 0;
    margin: 0;
    flex-direction: column;
    gap: 12px;
    justify-content: end;

    .error {
      color: red;
      padding: 0;
    }
  }

  textarea {
    width: 100%;
    height: 100px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.default};
    padding: 12px;
    background-color: #fff;
  }


  .submit {
    display: flex;
    justify-content: end;
    margin-top: 12px;
    select {
      width: 75px;
      height: 40px;
      border: 1px solid ${({ theme }) => theme.colors.border};
      border-radius: ${({ theme }) => theme.borderRadius.default};
      padding: 12px;
      margin-right: 12px;
      margin-left: 12px;
      margin-top: 0;
      background-color: #fff;
    }
  }
`

export default AddBookReview

