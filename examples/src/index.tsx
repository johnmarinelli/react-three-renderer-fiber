import "./Camera";
import * as React from "react";
import * as THREE from "three";
import {Euler} from "three";
import {ReactThreeRenderer} from "../../src";

class Demo extends React.Component<any, {
  cubeRotation: Euler,
}> {
  constructor() {
    super();

    this.state = {
      cubeRotation: new Euler(),
    };
  }

  public render() {
    return <webGLRenderer
      width={window.innerWidth}
      height={window.innerHeight}

      clearColor={0xdddddd}
      clearAlpha={1}
    >
      <render
        autoRender
        onAnimationFrame={this.onAnimationFrame}
        scene={<scene>
          <mesh
            geometry={<circleGeometry radius={1} segments={32}/>}
            material={<meshBasicMaterial
              color={0xffff00}
            />}
          />
          <pointLight
            position={new THREE.Vector3(10, 0, 10)}
            color={0xFFFF00}
          />
        </scene>}
        camera={<perspectiveCamera
          fov={75}
          aspect={window.innerWidth / window.innerHeight}
          near={0.1}
          far={1000}
          position={new THREE.Vector3(0, 0, 5)}
        />}
      />
    </webGLRenderer>;
  }

  private onAnimationFrame = () => {
    this.setState({
      cubeRotation: new Euler(
        this.state.cubeRotation.x + 0.1,
        this.state.cubeRotation.y + 0.1,
        this.state.cubeRotation.z,
      ),
    });
  }
}

ReactThreeRenderer.render(<Demo />, document.getElementById("example"));
