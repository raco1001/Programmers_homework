import { IBanner } from '@/models/banner.model';
import { Theme } from '@/style/theme';
import { useMemo, useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { styled } from 'styled-components';
import BannerItem from './BannerItem';
interface BannerProps {
  banners: IBanner[]
}

function Banner({ banners }: BannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    if (currentIndex === 0) return;
    setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex === banners.length - 1) return;
    setCurrentIndex(currentIndex + 1);
  };

  const transFormValue = useMemo(() => {
    return currentIndex * -100;
  }, [currentIndex]);

  const handleIndicatorClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <>
      <BannerStyle>
        {/*배너 그룹*/}
        <BannerContainerStyle $transformValue={transFormValue}>
          {banners.map((banner) => (
            <BannerItem key={banner.id} banner={banner} />
          ))}
        </BannerContainerStyle>

        {/*배너 버튼*/}
        <BannerButtonStyle>
          <button className="prev" onClick={handlePrev}>
            <FaAngleLeft />
          </button>
          <button className="next" onClick={handleNext}>
            <FaAngleRight />
          </button>
        </BannerButtonStyle>

        {/*indicator*/}
        <BannerIndicatorStyle>
          {banners.map((banner, index) => (
            <span className={index === currentIndex ? 'active' : ''} key={banner.id} onClick={() => handleIndicatorClick(index)}>
            </span>
          ))}
        </BannerIndicatorStyle>
      </BannerStyle>
    </>
  )
}

const BannerStyle = styled.div`
  overflow: hidden;
  position: relative;
`

interface IBannerContainerStyleProps {
  $transformValue: number;
}

const BannerContainerStyle = styled.div<IBannerContainerStyleProps>`
  display: flex;
  transform: translateX(${({ $transformValue }) => $transformValue}%);
  transition: transform 0.5s ease-in-out;
`

const BannerButtonStyle = styled.div`
  button {
    border: 0;
    width: 40px;
    height: 40px;
    background: rgba(0,0,0,0.5);
    border-radius: 500px;
    font-size:2rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
  }

  svg {
      fill: #fff;

  }

  .prev {
    left: 10px;
  }

  .next {
    right: 10px;
  } 

`

const BannerIndicatorStyle = styled.div<{ theme: Theme }>`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);

  span {
    display: inline-block;
    width: 16px;
    height: 16px;
    background: #fff;
    border-radius: 100px;
    margin: 0 4px;
    cursor: pointer;
  }

  .active {
    background: ${({ theme }) => theme.colors.primary};
  }

`

export default Banner
