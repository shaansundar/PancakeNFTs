import React, { useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import { Button, Heading, Text, Flex, Checkbox, AutoRenewIcon } from '@pancakeswap/uikit'
import { useTradingCompetitionContract } from 'hooks/useContract'
import { useTranslation } from 'contexts/Localization'
import useToast from 'hooks/useToast'
import { CompetitionProps } from '../../types'

const StyledCheckbox = styled(Checkbox)`
  min-width: 24px;
`

const StyledLabel = styled.label`
  cursor: pointer;
`

const RegisterWithProfile: React.FC<CompetitionProps> = ({ profile, onDismiss, onRegisterSuccess }) => {
  const [isAcknowledged, setIsAcknowledged] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const tradingCompetitionContract = useTradingCompetitionContract()
  const { account } = useWeb3React()
  const { toastSuccess, toastError } = useToast()
  const { t } = useTranslation()

  const handleConfirmClick = () => {
    tradingCompetitionContract.methods
      .register()
      .send({ from: account })
      .on('sending', () => {
        setIsConfirming(true)
      })
      .on('receipt', async () => {
        toastSuccess(t('You have registered for the competition!'))
        onDismiss()
        onRegisterSuccess()
      })
      .on('error', (error) => {
        toastError(t('Error'), error?.message)
        setIsConfirming(false)
      })
  }

  return (
    <>
      <Heading scale="md" mb="24px">{`@${profile.username}`}</Heading>
      <Flex flexDirection="column">
        <Text bold>
          {t('Registering for the competition will make your wallet address publicly visible on the leaderboard.')}
        </Text>
        <Text fontSize="14px" color="textSubtle" mb="24px">
          {t('This decision cannot be reversed.')}
        </Text>
        <StyledLabel htmlFor="acknowledgement">
          <Flex alignItems="center" justifyContent="space-between">
            <StyledCheckbox
              id="acknowledgement"
              checked={isAcknowledged}
              onChange={() => setIsAcknowledged(!isAcknowledged)}
              scale="sm"
            />
            <Text ml="16px">
              {t('I understand that my address may be displayed publicly throughout the competition.')}
            </Text>
          </Flex>
        </StyledLabel>
      </Flex>
      <Button
        mt="24px"
        width="100%"
        onClick={handleConfirmClick}
        disabled={!isAcknowledged || isConfirming}
        isLoading={isConfirming}
        endIcon={isConfirming ? <AutoRenewIcon spin color="currentColor" /> : null}
      >
        {t('Confirm')}
      </Button>
    </>
  )
}

export default RegisterWithProfile
