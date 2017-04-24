import * as THREE from 'three';
import { scene3d, camera3d, canvas3d } from './3d';

const MAX_ROTATION = Math.PI * 2;

export class Title3d implements IUpdate {

    private title: THREE.Mesh;
    private titleBox: THREE.Box3;
    private titlePivot: THREE.Group;
    private axis: number = 0;
    private dir: number = 1;

    constructor() {
        this.init();
    }

    private init(): void {
        const loader = new THREE.JSONLoader();
        
        loader.load('./assets/havoc.json',
            ( geometry, materials ) => {

                const material = new THREE.MeshBasicMaterial( {
                    color: 0x001111, 
                    shading: THREE.FlatShading,
                    polygonOffset: true,
                    polygonOffsetFactor: 1,
                    polygonOffsetUnits: 1
                });

                this.title = new THREE.Mesh(geometry, material);

                const edgeGeometry = new THREE.EdgesGeometry(this.title.geometry as any, 10); 
                const lineMaterial = new THREE.LineBasicMaterial( { color: 0x00FFFF, linewidth: 4 } );
                const wireframe = new THREE.LineSegments( edgeGeometry, lineMaterial );

                this.title.add( wireframe );

                this.titleBox = new THREE.Box3().setFromObject(this.title);
                this.titleBox.getCenter(this.title.position);
                this.title.position.multiplyScalar( - 1 );

                this.titlePivot = new THREE.Group();
                scene3d.add(this.titlePivot);
                this.titlePivot.add(this.title);
            }
        );
    }

    update(dt: number) {
        let inc: number = 0.03 * this.dir;

        if (this.axis === 0) {
            
            this.titlePivot.rotation.x += inc;
            
            if (this.titlePivot.rotation.x > MAX_ROTATION || this.titlePivot.rotation.x < -MAX_ROTATION) {
                this.titlePivot.rotation.x = 0;
                this.axis = 2;
            }

            
        } else if (this.axis === 2) {

            this.titlePivot.rotation.z += inc;
            
            if (this.titlePivot.rotation.z > MAX_ROTATION || this.titlePivot.rotation.z < -MAX_ROTATION) {
                this.titlePivot.rotation.z = 0;
                this.axis = 0;
                this.dir *= -1;
            }

        }
    }

    destroy() {
        this.title.geometry.dispose();
        scene3d.remove(this.titlePivot);
    }
}