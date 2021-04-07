import React, { useEffect, useState } from 'react'
import { View, StyleSheet, ActivityIndicator, Modal, Pressable } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { appDoneLoading } from '../store/appState/actions'
import { appLoading, selectMessage } from '../store/appState/selectors'

export default function Container ({ children, style }) {
  const dispatch = useDispatch()
  const message = useSelector(selectMessage)
  const loading = useSelector(appLoading)
  const backgroundColor = message === null ? null : message.variant === 'success' ? 'green' : 'red'
  const [responsive, setResponsive] = useState(false)
  useEffect(() => {
    setResponsive(false)
  }, [loading])
  if (message) console.log(`App message: ${message.text}`)

  return (
    <View style={{ ...styles.container, ...style }}>
      <MessageBox style={{ backgroundColor }}>
        <MessageText>{message && message.text}</MessageText>
      </MessageBox>
      {children}
      <Modal visible={!responsive && loading} onRequestClose={() => dispatch(appDoneLoading())} animationType='fade' transparent>
        <Pressable onPress={() => setResponsive(true)}>
          <View style={styles.centeredView}>
            <ActivityIndicator style={styles.modalView} color='grey' size='large' />
          </View>
        </Pressable>
      </Modal>
    </View>
  )
}
const MessageBox = styled.View`
  width: 100%;
  align-items: center;
`
const MessageText = styled.Text``

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    height: '100%'
  },
  modalView: {
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  }
})
