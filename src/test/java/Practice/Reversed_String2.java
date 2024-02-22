package Practice;

public class Reversed_String2 {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		String s= "My Name is Swamy ";
		String[] a=s.split(" ");
		
		String ss="";
		 String revString="";
		for(int i=0;i<a.length;i++)
		{
			System.out.println(a[i]+" ");
			String sk=a[i];
			
			for(int j=sk.length()-1;j>=0;j--) {
				ss=ss+sk.charAt(j);
			}
			revString=revString + ss+ " ";
			
		}
		System.out.println(revString);
	}
	
}
