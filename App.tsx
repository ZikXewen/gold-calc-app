import Slider from '@react-native-community/slider'
import { SetStateAction, useEffect, useState } from 'react'
import { SafeAreaView, Text, TextInput, View } from 'react-native'

const Item = ({
  value,
  decimal,
  onChange,
  label,
  unit,
  minimum,
  maximum,
  step,
}: {
  value: number
  decimal?: number
  onChange: (_: number) => void
  label: string
  unit: string
  minimum?: number
  maximum: number
  step: number
}) => {
  return (
    <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center' }}>
      <View
        style={{ flexDirection: 'row', width: '50%', alignItems: 'center' }}
      >
        <Text style={{ width: '30%', marginRight: 10 }}>{label}</Text>
        <TextInput
          style={{ width: '40%', marginRight: 10 }}
          value={value.toFixed(decimal || 0)}
          onChangeText={(text) => {
            onChange(parseFloat(text) || 0)
          }}
        />
        <Text>{unit}</Text>
      </View>
      <Slider
        minimumValue={minimum || 0}
        maximumValue={maximum}
        step={step}
        style={{ flex: 1 }}
        value={value}
        onValueChange={onChange}
      />
    </View>
  )
}

const App = () => {
  const [capital, setCapital] = useState(0)
  const [xauusd, setXauusd] = useState(0)
  const [usdthb, setUsdthb] = useState(0)
  const [gold, setGold] = useState(0)

  useEffect(() => {
    if (xauusd != 0 && usdthb != 0)
      setGold(capital / (xauusd * usdthb * 0.47285) || 0)
  }, [capital, xauusd, usdthb])

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#F5FCFF',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        flex: 1,
      }}
    >
      <Item
        value={capital}
        onChange={(value) => setCapital(value)}
        label="ทุน"
        unit="บาท"
        maximum={3000000}
        step={10000}
      />
      <Item
        value={xauusd}
        onChange={(value) => setXauusd(value)}
        label="XAUUSD"
        unit="$"
        minimum={1000}
        maximum={2000}
        step={0.1}
        decimal={2}
      />
      <Item
        value={usdthb}
        onChange={(value) => setUsdthb(value)}
        label="USDTHB"
        unit="บาท"
        minimum={25}
        maximum={40}
        step={0.01}
        decimal={2}
      />
      <Item
        value={gold}
        onChange={(value) => {
          setGold(value)
          setCapital(value * xauusd * usdthb * 0.47265)
        }}
        label="ได้ทอง"
        unit="บาท"
        maximum={200}
        step={0.1}
        decimal={2}
      />
    </SafeAreaView>
  )
}

export default App
