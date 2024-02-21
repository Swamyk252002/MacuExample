package Practice;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.openqa.selenium.chrome.ChromeDriver;

public class Read_Data_File {

	public static void main(String[] args) throws IOException {
		  
		System.setProperty("webdriver.chrome.driver","D:\\Chrome\\chromedriver.exe");
		
		ChromeDriver driver=new ChromeDriver();
		driver.get("https://www.w3schools.com/howto/howto_css_register_form.asp");
		driver.manage().window().maximize();
		File file=new File("D:\\macu\\MACU_POC\\resources\\config\\test_execution\\test.xlsx");
		FileInputStream fis=new FileInputStream(file);
		XSSFWorkbook wb=new XSSFWorkbook(fis);
		XSSFSheet sheet=wb.getSheetAt(0);
		XSSFCell cell;
		
		for(int i=1;i<sheet.getLastRowNum();i++) {
			cell=sheet.getRow(i).getCell(0);
			System.out.println(cell.getStringCellValue());
			cell=sheet.getRow(i).getCell(1);
			System.out.println(cell.getStringCellValue());
		}
		
		
	}

}
