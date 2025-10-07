export class Vector2 {
  public readonly x: number;
  public readonly y: number;

  public static readonly ZERO = new Vector2(0, 0);
  public static readonly ONE = new Vector2(1, 1);
  public static readonly UP = new Vector2(0, 1);
  public static readonly DOWN = new Vector2(0, -1);
  public static readonly LEFT = new Vector2(-1, 0);
  public static readonly RIGHT = new Vector2(1, 0);
  public static readonly INFINITY = new Vector2(Infinity, Infinity);

  /**
   * Create a new Vector 2
   */
  public constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  /**
   * Returns a new vector that is the sum of this vector and another vector.
   *
   * @param v The vector to add.
   */
  public add(v: Vector2): Vector2 {
    return new Vector2(this.x + v.x, this.y + v.y);
  }

  /**
   * Returns a new vector that is the difference between this vector and another vector. (this - v)
   *
   * @param v The vector to subtract.
   */
  public subtract(v: Vector2): Vector2 {
    return new Vector2(this.x - v.x, this.y - v.y);
  }

  /**
   * Returns a new vector that is the result of scaling this vector by a scalar value.
   * 
   * @param scalar The value to scale by.
   */
  public scale(scalar: number): Vector2 {
    return new Vector2(this.x * scalar, this.y * scalar);
  }

  /**
   * Calculates the dot product of this vector and another vector.
   *
   * @param v The other vector.
   */
  public dot(v: Vector2): number {
    return this.x * v.x + this.y * v.y;
  }

  /**
   * Calculates the squared magnitude (length) of the vector.
   *
   * Useful for comparisons as it avoids a square root operation.
   */
  public get magnitudeSq(): number {
    return this.x * this.x + this.y * this.y;
  }

  /**
   * Calculates the magnitude (length) of the vector.
   */
  public get magnitude(): number {
    return Math.sqrt(this.magnitudeSq);
  }

  /**
   * Returns a new vector with the same direction but a magnitude of 1.
   * If the magnitude is zero, it returns Vector2.ZERO.
   */
  public normalize(): Vector2 {
    const mag = this.magnitude;
    if (mag === 0) {
      return Vector2.ZERO;
    }
    return this.scale(1 / mag);
  }

  // --- Other Utilities ---

  /**
   * Calculates the distance between this vector (point A) and another vector (point B).
   * @param v The other vector (point B).
   */
  public distance(v: Vector2): number {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  /**
   * Checks if this vector is equal to another vector within a small epsilon tolerance.
   *
   * @param v The vector to compare against.
   * @param epsilon The tolerance for floating point comparison (default: 1e-6).
   */
  public equals(v: Vector2, epsilon: number = 1e-6): boolean {
    return (
      Math.abs(this.x - v.x) < epsilon && Math.abs(this.y - v.y) < epsilon
    );
  }

  /**
   * Returns the negative of this vector (points in the opposite direction).
   */
  public negate(): Vector2 {
    return new Vector2(-this.x, -this.y);
  }

  /**
   * Returns a string representation of the vector.
   */
  public toString(): string {
    return `Vector2(${this.x.toFixed(2)}, ${this.y.toFixed(2)})`;
  }
}

export class Vector3 {
  public readonly x: number;
  public readonly y: number;
  public readonly z: number;

  public static readonly ZERO = new Vector3(0, 0, 0);
  public static readonly ONE = new Vector3(1, 1, 1);
  public static readonly FORWARD = new Vector3(0, 0, 1);
  public static readonly BACK = new Vector3(0, 0, -1);
  public static readonly UP = new Vector3(0, 1, 0);
  public static readonly DOWN = new Vector3(0, -1, 0);
  public static readonly LEFT = new Vector3(-1, 0, 0);
  public static readonly RIGHT = new Vector3(1, 0, 0);
  public static readonly INFINITY = new Vector3(Infinity, Infinity, Infinity);

  /**
   * Create a new Vector 3
   */
  public constructor(x: number = 0, y: number = 0, z: number = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  /**
   * Returns a new vector that is the sum of this vector and another vector.
   *
   * @param v The vector to add.
   */
  public add(v: Vector3): Vector3 {
    return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z);
  }

  /**
   * Returns a new vector that is the difference between this vector and another vector. (this - v)
   *
   * @param v The vector to subtract.
   */
  public subtract(v: Vector3): Vector3 {
    return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z);
  }

  /**
   * Returns a new vector that is the result of scaling this vector by a scalar value.
   *
   * @param scalar The value to scale by.
   */
  public scale(scalar: number): Vector3 {
    return new Vector3(this.x * scalar, this.y * scalar, this.z * scalar);
  }

  /**
   * Calculates the dot product of this vector and another vector.
   *
   * @param v The other vector.
   */
  public dot(v: Vector3): number {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }

  /**
   * Calculates the cross product of this vector and another vector.
   * The result is a vector perpendicular to both input vectors.
   *
   * @param v The other vector.
   */
  public cross(v: Vector3): Vector3 {
    const x = this.y * v.z - this.z * v.y;
    const y = this.z * v.x - this.x * v.z;
    const z = this.x * v.y - this.y * v.x;
    return new Vector3(x, y, z);
  }

  /**
   * Calculates the squared magnitude (length) of the vector.
   */
  public get magnitudeSq(): number {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }

  /**
   * Calculates the magnitude (length) of the vector.
   */
  public get magnitude(): number {
    return Math.sqrt(this.magnitudeSq);
  }

  /**
   * Returns a new vector with the same direction but a magnitude of 1.
   * If the magnitude is zero, it returns Vector3.ZERO.
   */
  public normalize(): Vector3 {
    const mag = this.magnitude;
    if (mag === 0) {
      return Vector3.ZERO;
    }
    return this.scale(1 / mag);
  }

  /**
   * Calculates the distance between this vector (point A) and another vector (point B).
   * @param v The other vector (point B).
   */
  public distance(v: Vector3): number {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    const dz = this.z - v.z;

    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }

  /**
   * Checks if this vector is equal to another vector within a small epsilon tolerance.
   * @param v The vector to compare against.
   * @param epsilon The tolerance for floating point comparison (default: 1e-6).
   */
  public equals(v: Vector3, epsilon: number = 1e-6): boolean {
    return (
      Math.abs(this.x - v.x) < epsilon &&
      Math.abs(this.y - v.y) < epsilon &&
      Math.abs(this.z - v.z) < epsilon
    );
  }

  /**
   * Returns the negative of this vector (points in the opposite direction).
   */
  public negate(): Vector3 {
    return new Vector3(-this.x, -this.y, -this.z);
  }

  /**
   * Returns a string representation of the vector.
   */
  public toString(): string {
    return `Vector3(${this.x.toFixed(2)}, ${this.y.toFixed(2)}, ${this.z.toFixed(2)})`;
  }
}
