import React from 'react'
import styled from 'styled-components'
import { Heading } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import Page from 'components/layout/Page'
import NftList from './components/NftList'

const StyledHero = styled.div`
  border-bottom: 2px solid ${({ theme }) => theme.colors.textSubtle};
  margin-bottom: 24px;
  padding-bottom: 32px;
`

const Collectibles = () => {
  const { t } = useTranslation()

  return (
    <Page>
      <StyledHero>
        <Heading as="h1" scale="xxl" color="secondary" paddingBottom="10px">
          {t('Flea Market')}
        </Heading>
        <Heading as="h2" color="primary">
          {t('Get the best deals here!')}
        </Heading>
      </StyledHero>
      <NftList />
    </Page>
  )
}

export default Collectibles
