import { CalculatorService } from "./calculator.service";
import { TestBed } from '@angular/core/testing';
import { LoggerService } from "./logger.service";


describe('CalculatorService',()=>{
    let calc :CalculatorService;
    let loggerSpy:any
    beforeEach(()=>{
         loggerSpy = jasmine.createSpyObj('LoggerService',["log"]);
         TestBed.configureTestingModule({
           providers:[
            CalculatorService,
            {provide:LoggerService , useValue:loggerSpy}          
           ]

         });
   calc = TestBed.inject(CalculatorService)      
    })

   

it('should add two numbers',()=>{
 
  const result = calc.add(2,2);
  expect(result).toBe(4);
  expect(loggerSpy.log).toHaveBeenCalledTimes(1);
})

it('should subtract two numbers',()=>{
    const result = calc.subtract(3,2);
    expect(result).toBe(1,"unexpected subtract result")
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);

})

})