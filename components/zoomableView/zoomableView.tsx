import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
  GestureEvent,
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  useWindowDimensions,
  LayoutChangeEvent,
} from 'react-native';

interface IGameFieldProps {
  maxScale?: number;
  minScale?: number;
  children: React.ReactNode;
  initialScale?: number;
  calculateInitialScale?: boolean;
}

const ZoomableView = ({
  maxScale = 5,
  minScale = 0.2,
  children,
  initialScale = 0.3,
  calculateInitialScale = false,
}: IGameFieldProps) => {
  const {height, width} = useWindowDimensions();

  const [{fieldWidth, fieldHeight}, setFieldSize] = useState({
    fieldWidth: 0,
    fieldHeight: 0,
  });

  const onFieldLayout = (event: LayoutChangeEvent) => {
    setFieldSize({
      fieldWidth: event.nativeEvent.layout.width,
      fieldHeight: event.nativeEvent.layout.height,
    });
  };

  const [{scale, beganScale, scaleInProgress}, setScale] = useState({
    beganScale: initialScale,
    scale: initialScale,
    scaleInProgress: false,
  });

  const [coordinates, setCoordinates] = useState({
    x: 0,
    y: 0,
    beganX: 0,
    beganY: 0,
  });

  const onPanGestureEventBegan = () => {
    setCoordinates(coordinates => ({
      ...coordinates,
      beganX: coordinates.x,
      beganY: coordinates.y,
    }));
  };

  const calculateCoordinate = (
    coordinate: number,
    fieldSize: number,
    screenSize: number,
  ) => {
    if (coordinate > screenSize / 2 - (1 / 2) * (1 - scale) * fieldSize) {
      return screenSize / 2 - (1 / 2) * (1 - scale) * fieldSize;
    } else if (
      coordinate <
      -fieldSize +
        screenSize -
        screenSize / 2 +
        (1 / 2) * (1 - scale) * fieldSize
    ) {
      return (
        -fieldSize +
        screenSize -
        screenSize / 2 +
        (1 / 2) * (1 - scale) * fieldSize
      );
    }
    return coordinate;
  };

  const onPanGestureEvent = (
    event: GestureEvent<PanGestureHandlerEventPayload>,
  ) => {
    if (!scaleInProgress) {
      setCoordinates({
        ...coordinates,
        x: calculateCoordinate(
          coordinates.beganX + event.nativeEvent.translationX,
          fieldWidth,
          width,
        ),
        y: calculateCoordinate(
          coordinates.beganY + event.nativeEvent.translationY,
          fieldHeight,
          height,
        ),
      });
    }
  };

  const onPinchGestureEventBegan = () => {
    setScale({scale, beganScale: scale, scaleInProgress});
  };

  const onPinchGestureEventEnd = () => {
    setScale({scale, beganScale, scaleInProgress: false});
  };

  const calculateScale = (newScale: number) => {
    if (scale >= minScale && scale <= maxScale) {
      return newScale;
    } else if (scale > maxScale) {
      return maxScale;
    } else {
      return minScale;
    }
  };

  const onPinchGestureEvent = (event: PinchGestureHandlerGestureEvent) => {
    setScale({
      beganScale,
      scale: calculateScale(beganScale * event.nativeEvent.scale),
      scaleInProgress: true,
    });
  };

  const panRef = useRef(null);
  const pinchRef = useRef(null);

  useEffect(() => {
    setCoordinates({
      ...coordinates,
      x: calculateCoordinate(coordinates.x, fieldWidth, width),
      y: calculateCoordinate(coordinates.y, fieldHeight, height),
    });
  }, [scale, width, height, fieldWidth, fieldHeight]);

  useEffect(() => {
    if (calculateInitialScale && width && height && fieldWidth && fieldHeight) {
      setScale({
        scale: Math.min(width / fieldWidth, height / fieldHeight),
        beganScale,
        scaleInProgress,
      });
    }
  }, [width, height, fieldHeight, fieldWidth]);

  return (
    <GestureHandlerRootView>
      <PinchGestureHandler
        ref={pinchRef}
        onGestureEvent={onPinchGestureEvent}
        onBegan={onPinchGestureEventBegan}
        onEnded={onPinchGestureEventEnd}
        simultaneousHandlers={panRef}>
        <PanGestureHandler
          ref={panRef}
          onGestureEvent={onPanGestureEvent}
          onBegan={onPanGestureEventBegan}
          simultaneousHandlers={pinchRef}>
          <View style={styles.page}>
            <View
              style={[
                {
                  left: coordinates.x,
                  top: coordinates.y,
                },
                {
                  transform: [
                    {
                      scale,
                    },
                  ],
                },
                styles.movable,
              ]}
              onLayout={onFieldLayout}>
              {children}
            </View>
          </View>
        </PanGestureHandler>
      </PinchGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  page: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  movable: {
    position: 'absolute',
  },
});

export default ZoomableView;

// TODO: подумать о расположении координат по умолчанию - нужно, чтобы они начинались с левой верхней части поля
