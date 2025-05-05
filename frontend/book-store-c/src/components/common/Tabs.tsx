import React, { useState } from 'react'
import { styled } from 'styled-components'
import { Theme } from '../../style/theme'
interface ITabProps {
  children: React.ReactNode
  title: string
}


function Tab({ children }: ITabProps) {
  return <TabStyle>{children}</TabStyle>
}

interface ITabsProps {
  children: React.ReactNode
}


function Tabs({ children }: ITabsProps) {
  const [activeTabIndex, setActiveTabIndex] = useState(0)

  const tabs = React.Children.map(children, (child, index) => {
    return React.cloneElement(child as React.ReactElement, {
      onClick: () => setActiveTabIndex(index),
    })
  })

  return (
    <>
      <TabsStyle>
        <div className="tab-header">
          {tabs?.map((tab, index) => (
            <button key={index} onClick={() => setActiveTabIndex(index)} className={`tab-header-item ${index === activeTabIndex ? 'active' : ''}`}>
              {tab.props.title}
            </button>
          ))}
        </div>
        <div className="tab-content">
          {tabs?.[activeTabIndex]}
        </div>
      </TabsStyle>
    </>
  )
}

const TabsStyle = styled.div<{ theme: Theme }>`
  .tab-header {
    display: flex;
    gap: 2px;
    cursor: pointer;
    font-size: 1.25rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.text};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};

    button {
    border: none;
    background: #ddd;
    cursor: pointer;
    font-size: 1.25rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.text};
    border-radius: ${({ theme }) => theme.borderRadius.default} ${({ theme }) => theme.borderRadius.default} 0 0;
    padding: 12px 24px;
    transition: all 0.3s ease;

    &.active {
      background: ${({ theme }) => theme.colors.primary};
        color: #fff;
      }
    }
  }


  .tab-content {
    padding: 24px 0;
    border-radius: ${({ theme }) => theme.borderRadius.default};

  }
`

const TabStyle = styled.div``

export { Tab, Tabs }
