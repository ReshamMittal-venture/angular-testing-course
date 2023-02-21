import { fakeAsync, flush, flushMicrotasks, tick } from "@angular/core/testing"
import { of } from "rxjs";
import { delay } from "rxjs/internal/operators/delay";

describe('Async testing examples',()=>{
    it("Async teste example with Jasmine done",(done:DoneFn)=>{
        //set 
        let test = false;

        setTimeout(()=>{
            console.log('running assertions');
          test =true;
          expect(test).toBeTruthy();
       done();
        },1000)
    })


//angular fake async zone 
//tick utility- controls evolution of time in async context 
// advantage of fake async is that, we dont have to write assertions 
//in nested code block such as in done jasmine test case
//another it works with promises and observables

    it("Async test example -setTimeout", fakeAsync(() => {
        let test = false;
        setTimeout(()=>{})
        setTimeout(() => {
            console.log('running assertions setTimeout');
            test = true;
        }, 1000);
        //tick(1000);
      flush();//making sure we are executing all the timeout in the fake async zone and then run assertions
        expect(test).toBeTruthy();


    }));

    //learn to use FakeAsync in promises

    it('async example with plain promise',fakeAsync(()=>{
        let test = false;
        console.log('creating promise');

        //macrotasks or simply a TASK ajax calls, mouse click (browser op) added in event loop , BROSWER TASKS QUEUE
        // setTimeout(()=>{
        //     console.log(' setTimeout1 trigger ');

        // })
        // setTimeout(()=>{
        //     console.log(' setTimeout2 trigger ');
        // })

        //microtasks get preference over macrotasks (browser ops)
        //microtasks are added oin their own separte queues other than TASKS queue(macro)

        Promise.resolve().then(()=>{

            console.log(' promise first then evaluated ');
            test =true;
            return Promise.resolve();
        }).then(()=>{
            console.log(' promise second then evaluated ');
        })
        flushMicrotasks(); // **all the mircotasks will be flushed before Assertions
        //before empty the microttasks and then TASK queue is looked by browser
        console.log('running test assertions promise');
        expect(test).toBeTruthy();

    }))

    it(" async test case with promise + setTimeout ",fakeAsync(()=>{
        let counter =0;

        Promise.resolve()
        .then(()=>{
            counter+=10; //microtask
            setTimeout(()=>{ //majorTask
                counter += 1;
            },1000)

        });
        expect(counter).toBe(0);

        flushMicrotasks();
        expect(counter).toBe(10);
        // tick(500);
        // expect(counter).toBe(10);
        // tick(500);
        flush();
        expect(counter).toBe(11);
    }))

    it("async test case with Observables", fakeAsync(() => {
        let test = false;
        console.log("creating observable")

        const test$ = of(test).pipe(delay(100));
        test$.subscribe(() => {
            test = true;
        })
        tick(100);
        console.log("running assertion observable")
        expect(test).toBe(true);
    }))
})



