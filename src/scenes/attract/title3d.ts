import * as PIXI from 'pixi.js';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { scene3d, canvas3d } from './3d';

const MAX_ROTATION = Math.PI * 2;

let title: THREE.Mesh;
let material: THREE.MeshStandardMaterial;
let edgeGeometry: THREE.EdgesGeometry;
let titlePivot: THREE.Group;
let lineMaterial: THREE.LineBasicMaterial;
let wireframe: THREE.LineSegments;
let light: THREE.HemisphereLight;

let texture3d: PIXI.Texture;
let titleSprite3d: PIXI.Sprite;

let axis: number = 0;
let dir: number = 1;

export class Title3d implements UpdateOnly {

    constructor(scene: PIXI.Container) {
        this.init();

        texture3d = PIXI.Texture.from(canvas3d.domElement);
        titleSprite3d = new PIXI.Sprite(texture3d);
        scene.addChild(titleSprite3d);
    }

    private init(): void {
        const loader = new GLTFLoader();
        loader.load('./assets/havoc.glb', (gltf) => {
            
            const mesh = gltf.scene;

            material = new THREE.MeshStandardMaterial( {
                color: 0x00FFFF,
                transparent: true,
                opacity: 0.4
            });

            mesh.traverse(node => {
                
                if (node instanceof THREE.Mesh) {

                    title = node;
                    title.material = material;
                    
                    // render as "wireframe"
                    edgeGeometry = new THREE.EdgesGeometry(title.geometry, 10); 
                    lineMaterial = new THREE.LineBasicMaterial( { color: 0x00FFFF, linewidth: 2 } );
                    wireframe = new THREE.LineSegments( edgeGeometry, lineMaterial );
                    title.add(wireframe);
                    
                    const titleBox = new THREE.Box3().setFromObject(title);
                    titleBox.getCenter(title.position);
                    title.position.multiplyScalar(-1);

                    titlePivot = new THREE.Group();
                    scene3d.add(titlePivot);
                    titlePivot.add(title);

                    light = new THREE.HemisphereLight(0x774152, 0x001111);
                    scene3d.add(light);
                }
            });
        });
    }

    update(dt: number) {
        let inc: number = 0.03 * dir;

        if (axis === 0) {
            
            titlePivot.rotation.x += inc;
            
            if (titlePivot.rotation.x > MAX_ROTATION || titlePivot.rotation.x < -MAX_ROTATION) {
                titlePivot.rotation.x = 0;
                axis = 2;
            }

            
        } else if (axis === 2) {

            titlePivot.rotation.z += inc;
            
            if (titlePivot.rotation.z > MAX_ROTATION || titlePivot.rotation.z < -MAX_ROTATION) {
                titlePivot.rotation.z = 0;
                axis = 0;
                dir *= -1;
            }

        }
    }

    render(dt: number) {
        titleSprite3d.texture.update(); //tell pixi that threejs changed
    }

    destroy() {
        while(scene3d.children.length > 0){
            scene3d.remove(scene3d.children[0]); 
        }

        material.dispose();
        edgeGeometry.dispose();
        lineMaterial.dispose();
        light.dispose();
    }
}