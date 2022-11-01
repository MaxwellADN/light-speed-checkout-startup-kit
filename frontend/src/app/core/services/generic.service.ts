import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { DatatableResponseInterface } from "../interfaces/datatable-response.interface";

export abstract class GenericService<T> {
    /**
     * Http request headers
     */
    public headers: HttpHeaders;
    /**
     * Api url
     */
    public apiUrl = environment.apiHost;

    /**
     * The constructor function is a function that is called when a new instance of the class is
     * created.
     * @param {HttpClient} http - HttpClient - This is the Angular HttpClient that we will use to make
     * the HTTP requests.
     * @param {string} endpoint - the endpoint of the API you want to call
     */
    constructor(public http: HttpClient, private endpoint: string) {
        this.headers = new HttpHeaders({
            "Authorization": "Bearer " + (JSON.parse(<string>localStorage.getItem("user")))?.token
        })
        this.apiUrl += this.endpoint;
    }

    /**
     * This function returns an observable of an array of type T, which is the type of the class that
     * extends this class.
     * @returns An Observable of type T[]
     */
    public getAll(): Observable<T[]> {
        return this.http.get<T[]>(this.apiUrl, { headers: this.headers })
    }

    /**
     * This function returns an observable of type T, which is a generic type, and it gets the data
     * from the API using the HTTP GET method.
     * @param {string} id - string - the id of the object you want to get
     * @returns Observable&lt;T&gt;
     */
    public get(id: string): Observable<T> {
        return this.http.get<T>(this.apiUrl + `/${id}`, { headers: this.headers })
    }

    /**
     * This function returns an observable of type DatatableResponseInterface, which is a generic type,
     * and it takes in a page number, size, and searchTerm, and it makes a get request to the apiUrl,
     * which is a string, and it passes in the page number, size, and searchTerm as parameters, and it
     * passes in the headers as a second parameter.
     * @param {number} page - The page number of the data to be retrieved
     * @param {number} size - number of items to return
     * @param {string} searchTerm - The search term that the user entered in the search box
     * @returns An Observable of type DatatableResponseInterface<T>
     */
    public search(page: number, size: number, searchTerm: string): Observable<DatatableResponseInterface<T>> {
        return this.http.get<DatatableResponseInterface<T>>(this.apiUrl + `/page/${page}/size/${size}/searchTerm/${searchTerm}`, { headers: this.headers })
    }

    /**
     * This function takes an entity of type T and returns an observable of type T.
     * @param {T} entity - T - the entity to create
     * @returns Observable&lt;T&gt;
     */
    public create(entity: T): Observable<T> {
        return this.http.post<T>(this.apiUrl, entity, { headers: this.headers });
    }

    /**
     * This function takes an id and an entity, and returns an observable of type T.
     * @param {string} id - string - the id of the entity to update
     * @param {T} entity - The entity to be updated.
     * @returns The updated entity.
     */
    public update(id: string, entity: T): Observable<T> {
        return this.http.put<T>(this.apiUrl+ `/${id}`, entity, { headers: this.headers });
    }

    /**
     * This function takes an id as a parameter, and returns an observable of type T.
     * @param {string} id - string - the id of the object to delete
     * @returns The Observable is being returned.
     */
    public delete(id: string): Observable<T> {
        return this.http.delete<T>(this.apiUrl+ `/${id}`, { headers: this.headers });
    }
}