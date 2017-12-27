import * as React from "react";
import {PureComponent} from "react";

export interface IColorSphereProps {
  rotation: any;
}

// fun to change the color state in React Devtools ;)
class ColorSphere extends PureComponent<IColorSphereProps, any> {
  constructor(props: IColorSphereProps, context: any) {
    super(props, context);

    this.state = {
      color: "#0000FF",
    };
  }

  public render() {
    const {
      color,
    } = this.state;

    const {
      rotation,
    } = this.props;

    return (<mesh
      rotation={rotation}
    >
      <sphereGeometry
        radius={1}
      />
      <meshBasicMaterial
        color={color}
      />
    </mesh>);
  }

  public componentWillUnmount() {
    console.log("sphere unmounting...");
  }
}

export default ColorSphere;
